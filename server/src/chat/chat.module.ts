import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserRepository } from 'src/entities/chatUser/chat-user.repository';
import { ChannelRepository } from 'src/entities/channel/channel.repository';
import { MessageRepository } from 'src/entities/messages/messages.repository';
import { UserRepository } from 'src/entities/user/user.repository';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      ChannelRepository,
      ChatUserRepository,
      MessageRepository,
    ]),
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
