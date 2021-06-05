import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserRepository } from 'src/entities/chatUser/chat-user.repository';
import { ChatsRepository } from 'src/entities/channel/channel.repository';
import { MessageRepository } from 'src/entities/messages/messages.repository';
import UserEntity from 'src/entities/user/user.entity';
import { UserRepository } from 'src/entities/user/user.repository';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(ChatUserRepository) private chatUserRepo: UserRepository,
    @InjectRepository(ChatsRepository) private chatsRepo: UserRepository,
    @InjectRepository(MessageRepository) private messageRepo: UserRepository,
  ) {}

  async Index() {
    const channel = this.chatsRepo
      .createQueryBuilder('ch')
      .leftJoinAndSelect('ch.chatUser', 'chatUser')
      .leftJoinAndSelect('chatUser.user', 'user')
      .leftJoinAndSelect('ch.message', 'message')
      .leftJoinAndSelect('message.fromUserId', 'fromUser')
      .getMany();
    return channel;
  }
}
