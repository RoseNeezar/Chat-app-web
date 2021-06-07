import axios, { AxiosResponse } from "axios";
import { IChannel } from "../redux/types/chat.type";
import {
  ILogin,
  IUser,
  IRegister,
  IUserContent,
} from "../redux/types/user.type";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body?: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const AuthService = {
  login: (data: ILogin) => requests.post<IUserContent>("auth/login", data),
  register: (data: IRegister) =>
    requests.post<IUserContent>("auth/register", data),
  logout: () => requests.post("auth/logout"),
  currentUser: () => requests.get<IUserContent>("auth/me"),
};

const ChatService = {
  fetchChats: () => requests.get<IChannel[]>("/chat"),
};

const agent = {
  AuthService,
  ChatService,
};

export default agent;
