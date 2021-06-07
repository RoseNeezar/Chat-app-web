export const FETCH_CHATS_TYPES = "FETCH_CHATS";
export const SET_CURRENT_CHAT_TYPES = "SET_CURRENT_CHAT";
export const FRIENDS_ONLINE = "FRIENDS_ONLINE";
export const FRIEND_ONLINE = "FRIEND_ONLINE";
export const FRIEND_OFFLINE = "FRIEND_OFFLINE";
export const SET_SOCKET = "SET_SOCKET";
export const RECEIVED_MESSAGE = "RECEIVED_MESSAGE";
export const SENDER_TYPING = "SENDER_TYPING";
export const PAGINATE_MESSAGES = "PAGINATE_MESSAGES";
export const INCREMENT_SCROLL = "INCREMENT_SCROLL";
export const CREATE_CHAT = "CREATE_CHAT";
export const ADD_USER_TO_GROUP = "ADD_USER_TO_GROUP";
export const LEAVE_CURRENT_CHAT = "LEAVE_CURRENT_CHAT";
export const DELETE_CURRENT_CHAT = "DELETE_CURRENT_CHAT";

export interface IFetchChatAction {
  type: typeof FETCH_CHATS_TYPES;
  payload: IChannel[];
}

export interface ISetCurrentChat {
  type: typeof SET_CURRENT_CHAT_TYPES;
  payload: Channel;
}

export type ChatDispatchTypes = IFetchChatAction | ISetCurrentChat;

export interface User {
  id: number;
  createAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  status?: string;
}

export interface ChatUser {
  id: number;
  createAt: Date;
  updatedAt: Date;
  channelId: number;
  userId: number;
  user: User;
}

export interface User2 {
  id: number;
  createAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
}

export interface Message {
  id: number;
  createAt: Date;
  updatedAt: Date;
  type: string;
  message: string;
  fromUserId: number;
  channelId: number;
  user: User2;
}

export interface Channel {
  id: number;
  createAt: Date;
  updatedAt: Date;
  type: string;
  chatUser: ChatUser[];
  message: Message[];
}

export interface IChannel {
  id: number;
  createAt: Date;
  updatedAt: Date;
  channelId: number;
  userId: number;
  channel: Channel;
}

export interface IChat {
  channels?: IChannel[];
  currentChat?: Channel;
}
