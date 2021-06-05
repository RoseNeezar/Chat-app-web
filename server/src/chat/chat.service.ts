import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserRepository } from 'src/entities/chatUser/chat-user.repository';
import { ChannelRepository } from 'src/entities/channel/channel.repository';
import { MessageRepository } from 'src/entities/messages/messages.repository';
import UserEntity from 'src/entities/user/user.entity';
import { UserRepository } from 'src/entities/user/user.repository';
import { getConnection } from 'typeorm';
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

  async createChannel(partnerId: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    try {
      const channel = this.channelRepo.create({
        type: 'dual',
      });

      await connection
        .createQueryBuilder()
        .insert()
        .into(ChatsUserEntity)
        .values([
          {
            channelId: channel.id,
            userId: 1,
          },
          {
            channelId: channel.id,
            userId: 2,
          },
        ]);
    } catch (error) {
      await queryRunner.release();
    }
  }
}
