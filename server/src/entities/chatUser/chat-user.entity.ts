import { Column, Entity as TOEntity, JoinColumn, ManyToOne } from 'typeorm';
import ChatsEntity from '../chat/chat.entity';
import Entity from '../entity.entity';
import UserEntity from '../user/user.entity';

@TOEntity('ChatUsers')
export default class ChatsUserEntity extends Entity {
  constructor(user: Partial<ChatsUserEntity>) {
    super();
    Object.assign(this, user);
  }

  @Column({ nullable: true })
  chatId: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => ChatsEntity, (chat) => chat.chatUser)
  @JoinColumn()
  chat: ChatsEntity;

  @ManyToOne(() => UserEntity, (user) => user.chatUser)
  @JoinColumn()
  user: UserEntity;
}
