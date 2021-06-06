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
