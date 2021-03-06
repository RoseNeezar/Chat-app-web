import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import UserEntity from 'src/entities/user/user.entity';
import {
  IChatGroupDto,
  ICreateChannelDto,
  ILeaveGroup,
  IMessageDto,
} from './chat.dto';
import { ChatService } from './chat.service';

@Controller('api/chat')
@UseGuards(AuthGuard())
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/search-user')
  @UseGuards(AuthGuard())
  searchUser(
    @Query('username') username: string,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return this.chatService.searchUser(username, user);
  }

  @Get('/')
  @UseGuards(AuthGuard())
  getChannels(@GetUser() user: UserEntity): Promise<any> {
    return this.chatService.getChannels(user);
  }

  @Post('/create-channel')
  createChannel(
    @Body() chatDto: ICreateChannelDto,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return this.chatService.createChannel(chatDto.partnerId, user);
  }

  @Get('/messages')
  @UseGuards(AuthGuard())
  getMessages(
    @Query() messageDto: IMessageDto,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return this.chatService.getChannelMessages(messageDto);
  }

  @Post('/join-group')
  addUserToGroup(@Body() chatGroupDto: IChatGroupDto): Promise<any> {
    return this.chatService.addUserToGroup(chatGroupDto);
  }

  @Post('/leave-group')
  leaveGroup(
    @Body() leaveGroupDto: ILeaveGroup,
    @GetUser() user: UserEntity,
  ): Promise<any> {
    return this.chatService.leaveCurrentChannel(leaveGroupDto.channelId, user);
  }

  @Delete('/:channelId')
  deleteChannel(@Param('channelId') channelId: number): Promise<any> {
    return this.chatService.deleteChannel(channelId);
  }
}
