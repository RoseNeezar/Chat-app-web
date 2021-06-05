import { Column, Entity as TOEntity, Index, OneToMany } from 'typeorm';
import ChatsUserEntity from '../chatUser/chat-user.entity';
import Entity from '../entity.entity';
import MessageEntity from '../messages/messages.entity';

@TOEntity('Chats')
export default class ChatsEntity extends Entity {
  constructor(user: Partial<ChatsEntity>) {
    super();
    Object.assign(this, user);
  }
  @Index()
  @Column()
  type: string;

  @OneToMany(() => ChatsUserEntity, (chatUser) => chatUser.chat)
  chatUser: ChatsUserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.chat)
  message: MessageEntity[];
}
