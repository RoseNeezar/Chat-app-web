import { IApiState } from "../../../types/defaultApiState";

export const LOGIN_TYPE = "LOGIN";
export const LOGIN_TYPE_LOADING = "LOGIN_TYPE_LOADING";
export const LOGIN_TYPE_ERROR = "LOGIN_TYPE_ERROR";

export const REGISTER_TYPE = "REGISTER";
export const REGISTER_TYPE_LOADING = "REGISTER_TYPE_LOADING";
export const REGISTER_TYPE_ERROR = "REGISTER_TYPE_ERROR";

export const LOGOUT = "LOGOUT";

export interface ILoginAction {
  type: typeof LOGIN_TYPE;
  apiState: Partial<IApiState>;
  payload: IUser;
}

export interface ILoginActionLoading {
  type: typeof LOGIN_TYPE_LOADING;
  apiState: Partial<IApiState>;
}
export interface ILoginActionError {
  type: typeof LOGIN_TYPE_ERROR;
  apiState: Partial<IApiState>;
}

export interface IRegisterAction {
  type: typeof REGISTER_TYPE;
  apiState: Partial<IApiState>;
  payload: IUser;
}

export interface IRegisterActionLoading {
  type: typeof REGISTER_TYPE_LOADING;
  apiState: Partial<IApiState>;
}
export interface IRegisterActionError {
  type: typeof REGISTER_TYPE_ERROR;
  apiState: Partial<IApiState>;
}

export interface ILogout {
  type: typeof LOGOUT;
}

export type AuthDispatchTypes =
  | ILoginAction
  | ILoginActionLoading
  | ILoginActionError
  | IRegisterAction
  | IRegisterActionLoading
  | IRegisterActionError
  | ILogout;

export interface IUser {
  user: IUserContent;
}

export interface IUserContent {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface IAuthState {
  IALogin: IApiState;
  IARegister: IApiState;
}

export interface IAuth {
  apiState: Partial<IAuthState>;
  user?: IUserContent;
}
