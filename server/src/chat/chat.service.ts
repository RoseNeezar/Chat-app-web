import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ChannelEntity from 'src/entities/channel/channel.entity';
import { ChannelRepository } from 'src/entities/channel/channel.repository';
import ChatsUserEntity from 'src/entities/chatUser/chat-user.entity';
import { ChatUserRepository } from 'src/entities/chatUser/chat-user.repository';
import { MessageRepository } from 'src/entities/messages/messages.repository';
import UserEntity from 'src/entities/user/user.entity';
import { UserRepository } from 'src/entities/user/user.repository';
import { getManager } from 'typeorm';
import { IChatGroupDto, IMessageDto } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(ChatUserRepository)
    private chatUserRepo: ChatUserRepository,
    @InjectRepository(ChannelRepository) private channelRepo: ChannelRepository,
    @InjectRepository(MessageRepository) private messageRepo: MessageRepository,
  ) {}

  async getChannels(user: UserEntity) {
    try {
      const channel = await this.userRepo
        .createQueryBuilder('usr')
        .where(`"usr"."id" = ${user.id} `)
        .leftJoinAndSelect('usr.chatUser', 'cu')
        .leftJoinAndSelect('cu.channel', 'ch')
        .leftJoinAndSelect('ch.chatUser', 'chatUser')
        .leftJoinAndSelect('chatUser.user', 'user')
        .andWhere(`NOT "user"."id" = ${user.id}`)
        .getOne();

      const result = channel.chatUser.map(async (ch) => {
        ch.channel.message = await this.messageRepo
          .createQueryBuilder('msg')
          .where('msg.channelId = :channelId', { channelId: ch.channel.id })
          .leftJoinAndSelect('msg.user', 'user')
          .take(20)
          .orderBy('msg.createAt', 'DESC')
          .getMany();
      });
      await Promise.all(result);
      if (!channel) {
        return [];
      }
      return channel.chatUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async createChannel(partnerId: number, user: UserEntity) {
    try {
      const userChannel = await this.userRepo
        .createQueryBuilder('usr')
        .where(`"usr"."id" = ${user.id} `)
        .leftJoinAndSelect('usr.chatUser', 'cu')
        .leftJoinAndSelect('cu.channel', 'ch')
        .leftJoinAndSelect('ch.chatUser', 'chatUser')
        .andWhere(`"ch"."type" = 'dual'`)
        .andWhere(`"chatUser"."userId" = ${partnerId}`)
        .getOne();
      if (userChannel && userChannel.chatUser.length > 0)
        throw new BadRequestException('Chat with this user already exist');

      let channel: ChannelEntity;
      await getManager().transaction(async (transactionalEntityManager) => {
        channel = this.channelRepo.create({
          type: 'dual',
        });
        await transactionalEntityManager.save(channel);
        await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(ChatsUserEntity)
          .values([
            {
              channelId: channel.id,
              userId: user.id,
            },
            {
              channelId: channel.id,
              userId: partnerId,
            },
          ])
          .execute();
      });

      const creator = await this.userRepo.findOne({
        where: {
          id: user.id,
        },
      });

      const partner = await this.userRepo.findOne({
        where: {
          id: partnerId,
        },
      });

      const forCreator = {
        id: channel.id,
        type: 'dual',
        Users: [partner],
        Messages: [],
      };
      const forReceiver = {
        id: channel.id,
        type: 'dual',
        Users: [creator],
        Messages: [],
      };

      return [forCreator, forReceiver];
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async getChannelMessages(messageDto: IMessageDto) {
    const { channelId, getPage } = messageDto;
    const limit = 10;
    const page = getPage || 1;
    const offset = page > 1 ? page * limit : 0;

    const messages = await this.messageRepo
      .createQueryBuilder('msg')
      .where('msg.channelId = :channelId', { channelId: channelId })
      .leftJoinAndSelect('msg.user', 'user')
      .orderBy('msg.id', 'DESC')
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(messages[1] / limit);

    if (page > totalPages) return { data: { messages: [] } };

    const result = {
      messages: messages[0],
      pagination: {
        page: +page,
        totalPages,
      },
    };
    return result;
  }

  async addUserToGroup(chatGroupDto: IChatGroupDto) {
    const { channelId, userId } = chatGroupDto;

    const channel = await this.channelRepo
      .createQueryBuilder('ch')
      .where('ch.id = :channelId', { channelId })
      .leftJoinAndSelect('ch.chatUser', 'cu')
      .leftJoinAndSelect('cu.user', 'user')
      .getOne();

    const messages = await this.messageRepo
      .createQueryBuilder('msg')
      .where('msg.channelId = :channelId', { channelId: channelId })
      .leftJoinAndSelect('msg.user', 'user')
      .take(20)
      .orderBy('msg.id', 'DESC')
      .getManyAndCount();

    channel.message = messages[0].reverse();

    channel.chatUser.forEach((user) => {
      if (user.userId === userId) {
        throw new BadRequestException('User already in group');
      }
    });

    await this.chatUserRepo.create({ channelId, userId }).save();
    const newChatter = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (channel.type === 'dual') {
      channel.type = 'group';
      await this.channelRepo.update(channelId, { type: 'group' });
    }

    return { channel, newChatter };
  }

  async deleteChannel(channelId: number) {
    try {
      const channel = await this.channelRepo
        .createQueryBuilder('ch')
        .where('ch.id = :channelId', { channelId })
        .leftJoinAndSelect('ch.chatUser', 'chatUser')
        .leftJoinAndSelect('chatUser.user', 'user')
        .getOne();

      const notifyUsers = channel.chatUser.map((user) => user.userId);

      await this.channelRepo.delete({ id: channelId });

      return { channelId, notifyUsers };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async leaveCurrentChannel(channelId: number, user: UserEntity) {
    try {
      const channel = await this.channelRepo
        .createQueryBuilder('ch')
        .where('ch.id = :channelId', { channelId })
        .leftJoinAndSelect('ch.chatUser', 'cu')
        .leftJoinAndSelect('cu.user', 'user')
        .getOne();

      if (channel.chatUser.length === 2) {
        throw new BadRequestException('You cannot leave this chat');
      }

      if (channel.chatUser.length === 3) {
        channel.type = 'group';
        await this.channelRepo.update(channelId, { type: 'dual' });
      }
      await this.chatUserRepo.delete({ channelId, userId: user.id });
      await this.messageRepo.delete({ channelId, fromUserId: user.id });

      const notifyUsers = channel.chatUser.map((user) => user.userId);

      return {
        channelId: channel.id,
        userId: user.id,
        currentUserId: user.id,
        notifyUsers,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async searchUser(username: string, user: UserEntity) {
    try {
      if (!username) {
        return [];
      }
      const users = await this.userRepo
        .createQueryBuilder('usr')
        .where('LOWER(usr.username) LIKE :username', {
          username: `%${username.toLowerCase()}%`,
        })
        .getMany();
      const result = users.filter((usr) => usr.id !== user.id);
      return result;
    } catch (error) {
      return [];
    }
  }

  async getChatters(userId: number) {
    try {
      const getChattersQuery = `
      select "cu"."userId" from "ChatUsers" as cu
      inner join (
          select "c"."id" from "Channel" as c
          where exists (
              select "u"."id" from "User" as u
              inner join "ChatUsers" on u.id = "ChatUsers"."userId"
              where u.id = ${userId} and c.id = "ChatUsers"."channelId"
          )
      ) as cjoin on cjoin.id = "cu"."channelId"
      where "cu"."userId" != ${userId}
  `;
      const result = await this.chatUserRepo.manager.query(getChattersQuery);
      return result.length > 0 ? result.map((el) => el.userId) : [];
    } catch (error) {
      return [];
    }
  }
}
