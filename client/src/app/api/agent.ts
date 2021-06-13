import axios, { AxiosResponse } from "axios";
import { IChannel, IPaginatedMessage, User } from "../redux/types/chat.type";
import { ILogin, IRegister } from "../redux/types/user.type";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body?: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const AuthService = {
  login: (data: ILogin) => requests.post<User>("auth/login", data),
  register: (data: IRegister) => requests.post<User>("auth/register", data),
  logout: () => requests.post("auth/logout"),
  currentUser: () => requests.get<User>("auth/me"),
};

const ChatService = {
  fetchChats: () => requests.get<IChannel[]>("/chat"),
  paginateMessages: (channelId: number, getPage: number) =>
    axios
      .get<IPaginatedMessage>("/chat/messages", {
        params: { channelId, getPage },
      })
      .then(responseBody),
  searchUser: (username: string) =>
    axios.get(`/chat/search-user`, { params: { username } }).then(responseBody),
  createChannel: (partnerId: number) =>
    requests.post("/chat/create-channel", { partnerId }),
  deleteChannel: (channelId: number) => requests.del(`/chat/${channelId}`),
};
const agent = {
  AuthService,
  ChatService,
};

export default agent;
