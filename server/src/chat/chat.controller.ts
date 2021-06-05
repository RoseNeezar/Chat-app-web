import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import UserEntity from 'src/entities/user/user.entity';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  getChannels(@GetUser() user: UserEntity): Promise<any> {
    return this.chatService.getChannels(user);
  }
}
