import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserRepository } from 'src/entities/chatUser/chat-user.repository';
import { ChannelRepository } from 'src/entities/channel/channel.repository';
import { MessageRepository } from 'src/entities/messages/messages.repository';
import UserEntity from 'src/entities/user/user.entity';
import { UserRepository } from 'src/entities/user/user.repository';
import { getConnection, getManager } from 'typeorm';
import ChannelEntity from 'src/entities/channel/channel.entity';
import ChatsUserEntity from 'src/entities/chatUser/chat-user.entity';

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
    const channel = await this.userRepo
      .createQueryBuilder('usr')
      .where(`"usr"."id" = ${user.id} `)
      .leftJoinAndSelect('usr.chatUser', 'cu')
      .leftJoinAndSelect('cu.channel', 'ch')
      .leftJoinAndSelect('ch.chatUser', 'chatUser')
      .leftJoinAndSelect('chatUser.user', 'user')
      .andWhere(`NOT "user"."id" = ${user.id}`)
      .leftJoinAndSelect('ch.message', 'message')
      .leftJoinAndSelect('message.fromUserId', 'fromUser')
      .limit(20)
      .orderBy('message.id', 'DESC')
      .getOne();

    return channel.chatUser;
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
}
