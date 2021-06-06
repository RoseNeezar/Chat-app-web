import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import UserEntity from 'src/entities/user/user.entity';
import { ChatDto } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  getChannels(@GetUser() user: UserEntity): Promise<any> {
    return this.chatService.getChannels(user);
  }

  @Post('/create-channel')
  @UseGuards(AuthGuard())
  createChannel(
    @Body() chatDto: ChatDto,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return this.chatService.createChannel(chatDto.partnerId, user);
  }
}
