import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity as TOEntity,
  Index,
  OneToMany,
} from 'typeorm';
import ChatsUserEntity from '../chatUser/chat-user.entity';
import Entity from '../entity.entity';
import MessageEntity from '../messages/messages.entity';

@TOEntity('User')
export default class UserEntity extends Entity {
  constructor(user: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 255, { message: 'Username must be at least 3 characters long' })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  @Length(6, 255)
  password: string;

  @OneToMany(() => ChatsUserEntity, (chatUser) => chatUser.user)
  chatUser: ChatsUserEntity[];

  @OneToMany(() => MessageEntity, (messages) => messages.user)
  messages: MessageEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
