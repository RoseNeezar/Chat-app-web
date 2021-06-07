export interface ChatDto {
  partnerId: number;
  username: string;
  channelId: number;
  getPage: number;
  userId: number;
}

export type ICreateChannelDto = Pick<ChatDto, 'partnerId'>;

export type IMessageDto = Pick<ChatDto, 'channelId' | 'getPage'>;

export type IChatGroupDto = Pick<ChatDto, 'channelId' | 'userId'>;

export type ILeaveGroup = Pick<ChatDto, 'channelId'>;
