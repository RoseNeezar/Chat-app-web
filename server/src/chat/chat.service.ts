import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserRepository } from 'src/entities/chatUser/chat-user.repository';
import { ChatsRepository } from 'src/entities/chat/chat.repository';
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
    return;
  }
}
