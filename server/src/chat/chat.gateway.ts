import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import MessageEntity from 'src/entities/messages/messages.entity';
import { MessageRepository } from 'src/entities/messages/messages.repository';
import UserEntity from 'src/entities/user/user.entity';
import { ChatService } from './chat.service';

@WebSocketGateway({
  path: '/api/socket.io',
  namespace: '/api',
  transports: ['polling', 'websocket'],
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService,
    @InjectRepository(MessageRepository) private messageRepo: MessageRepository,
  ) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');
  private users = new Map();
  private userSockets = new Map();

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: MessageEntity & { toUserId: string[] },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('yooooooo');
    let sockets = [];

    if (this.users.has(message.fromUserId)) {
      sockets = this.users.get(message.fromUserId).sockets;
    }

    message.toUserId.forEach((id) => {
      if (this.users.has(id)) {
        sockets = [...sockets, ...this.users.get(id).sockets];
      }
    });

    try {
      const msg = {
        type: message.type,
        fromUserId: message.fromUserId,
        channelId: message.channelId,
        message: message.message,
      };

      const savedMessage = await this.messageRepo.create(msg).save();
      const messenger: any = {};

      messenger.fromUserId = message.fromUserId;
      messenger.id = savedMessage.id;
      messenger.message = savedMessage.message;

      sockets.forEach((socket) => {
        this.server.to(socket).emit('received', messenger);
      });
    } catch (e) {}
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() user: UserEntity,
    @ConnectedSocket() client: Socket,
  ) {
    let sockets = [];
    console.log('----', user);
    if (typeof user !== null && this.users.has(user.id)) {
      const existingUser = this.users.get(user.id);
      existingUser.sockets = [...existingUser.sockets, ...[client.id]];
      this.users.set(user.id, existingUser);
      sockets = [...existingUser.sockets, ...[client.id]];
      this.userSockets.set(client.id, user.id);
    } else {
      this.users.set(user.id, { id: user.id, sockets: [client.id] });
      sockets.push(client.id);
      this.userSockets.set(client.id, user.id);
    }

    const onlineFriends = [];

    const chatters = await this.chatService.getChatters(user.id);

    for (let i = 0; i < chatters.length; i++) {
      if (this.users.has(chatters[i])) {
        const chatter = this.users.get(chatters[i]);
        chatter.sockets.forEach((socket) => {
          try {
            this.server.to(socket).emit('online', user);
          } catch (e) {}
        });
        onlineFriends.push(chatter.id);
      }
    }

    sockets.forEach((socket) => {
      try {
        this.server.to(socket).emit('friends', onlineFriends);
      } catch (e) {}
    });
  }

  async handleDisconnect(client: Socket) {
    if (this.userSockets.has(client.id)) {
      const user = this.users.get(this.userSockets.get(client.id));

      if (user.sockets.length > 1) {
        user.sockets = user.sockets.filter((sock) => {
          if (sock !== client.id) return true;

          this.userSockets.delete(sock);
          return false;
        });

        this.users.set(user.id, user);
      } else {
        const chatters = await this.chatService.getChatters(user.id);

        for (let i = 0; i < chatters.length; i++) {
          if (this.users.has(chatters[i])) {
            this.users.get(chatters[i]).sockets.forEach((socket) => {
              try {
                this.server.to(socket).emit('offline', user);
              } catch (e) {}
            });
          }
        }

        this.userSockets.delete(client.id);
        this.users.delete(user.id);
      }
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
