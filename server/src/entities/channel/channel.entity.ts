import { Column, Entity as TOEntity, Index, OneToMany } from 'typeorm';
import ChatsUserEntity from '../chatUser/chat-user.entity';
import Entity from '../entity.entity';
import MessageEntity from '../messages/messages.entity';

@TOEntity('Channel')
export default class ChannelEntity extends Entity {
  constructor(user: Partial<ChannelEntity>) {
    super();
    Object.assign(this, user);
  }
  @Index()
  @Column()
  type: string;

  @OneToMany(() => ChatsUserEntity, (chatUser) => chatUser.channel)
  chatUser: ChatsUserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.channel)
  message: MessageEntity[];
}
