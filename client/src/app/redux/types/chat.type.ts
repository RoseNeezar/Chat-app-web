export const FETCH_CHATS_TYPES = "FETCH_CHATS";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const SET_SOCKET = "SET_SOCKET";
export const RECEIVED_MESSAGE = "RECEIVED_MESSAGE";
export const PAGINATE_MESSAGES = "PAGINATE_MESSAGES";
export const CREATE_CHAT = "CREATE_CHAT";
export const DELETE_CURRENT_CHAT = "DELETE_CURRENT_CHAT";

export interface IFetchChatAction {
  type: typeof FETCH_CHATS_TYPES;
  payload: IChannel[];
}

export interface ISetCurrentChat {
  type: typeof SET_CURRENT_CHAT;
  payload: Channel | undefined;
}
export interface ISetSocket {
  type: typeof SET_SOCKET;
  payload: SocketIOClient.Socket;
}

export interface IReceivedMessage {
  type: typeof RECEIVED_MESSAGE;
  payload: { message: Message; userId: number };
}

export interface IPaginateMessages {
  type: typeof PAGINATE_MESSAGES;
  payload: IPaginatedMessage & { id?: number };
}

export interface ICreateChat {
  type: typeof CREATE_CHAT;
  payload: IChannel;
}

export interface IDeleteCurrentChat {
  type: typeof DELETE_CURRENT_CHAT;
  payload: number;
}

export type ChatDispatchTypes =
  | IFetchChatAction
  | ISetCurrentChat
  | ISetSocket
  | IReceivedMessage
  | IPaginateMessages
  | ICreateChat
  | IDeleteCurrentChat;

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
  pagination?: Pagination;
}

export interface IChannel {
  id: number;
  createAt: Date;
  updatedAt: Date;
  channelId: number;
  userId: number;
  channel: Channel;
}

export interface Pagination {
  page: string;
  totalPages: number;
}
export interface IPaginatedMessage {
  messages: Message[];
  pagination: Pagination;
}

export interface IChat {
  channels?: IChannel[];
  currentChat?: Channel;
  socket: SocketIOClient.Socket | null;
}
