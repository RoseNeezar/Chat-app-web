import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Length,
  IsNumber,
} from 'class-validator';

export class ChatDto {
  @IsNumber()
  partnerId: number;

  constructor(partnerId: number) {
    this.partnerId = partnerId;
  }
}

export interface IMessageDto {
  channelId: number;
  getPage: number;
}

export interface IChatGroupDto {
  channelId: number;
  userId: number;
}
