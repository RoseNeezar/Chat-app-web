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

  @Column({ nullable: true })
  fromUserId: number;

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fromUserId' })
  user: UserEntity;

  @Column({ nullable: true })
  channelId: number;

  @ManyToOne(() => ChannelEntity, (channel) => channel.message, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  channel: ChannelEntity;
}
