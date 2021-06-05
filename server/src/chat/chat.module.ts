import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserRepository } from 'src/entities/chatUser/chat-user.repository';
import { ChatsRepository } from 'src/entities/chat/chat.repository';
import { MessageRepository } from 'src/entities/messages/messages.repository';
import { UserRepository } from 'src/entities/user/user.repository';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      ChatsRepository,
      ChatUserRepository,
      MessageRepository,
    ]),
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
