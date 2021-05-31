import { IsEmail, Length } from 'class-validator';
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import Entity from '../entity.entity';

@TOEntity('users')
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}