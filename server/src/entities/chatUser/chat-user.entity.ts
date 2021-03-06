import { Column, Entity as TOEntity, JoinColumn, ManyToOne } from 'typeorm';
import ChannelEntity from '../channel/channel.entity';
import Entity from '../entity.entity';
import UserEntity from '../user/user.entity';

@TOEntity('ChatUsers')
export default class ChatsUserEntity extends Entity {
  constructor(user: Partial<ChatsUserEntity>) {
    super();
    Object.assign(this, user);
  }

  @Column({ nullable: true })
  channelId: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => ChannelEntity, (channel) => channel.chatUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  channel: ChannelEntity;

  @ManyToOne(() => UserEntity, (user) => user.chatUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
