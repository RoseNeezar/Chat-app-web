import {
  Column,
  Entity as TOEntity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import ChannelEntity from '../channel/channel.entity';
import Entity from '../entity.entity';
import UserEntity from '../user/user.entity';

@TOEntity('Messages')
export default class MessageEntity extends Entity {
  constructor(user: Partial<MessageEntity>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @Column()
  type: string;

  @Index()
  @Column()
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'fromUserId' })
  fromUserId: number;

  @Column({ nullable: true })
  chatId: number;

  @ManyToOne(() => ChannelEntity, (chat) => chat.message)
  @JoinColumn()
  channel: ChannelEntity;
}
