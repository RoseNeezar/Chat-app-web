import { IApiState } from "../../../types/defaultApiState";
import { User } from "./chat.type";

export const LOGIN_TYPE = "LOGIN";
export const LOGIN_TYPE_LOADING = "LOGIN_TYPE_LOADING";
export const LOGIN_TYPE_ERROR = "LOGIN_TYPE_ERROR";

export const REGISTER_TYPE = "REGISTER";
export const REGISTER_TYPE_LOADING = "REGISTER_TYPE_LOADING";
export const REGISTER_TYPE_ERROR = "REGISTER_TYPE_ERROR";

export const LOGOUT = "LOGOUT";

export const CURRENT_USER = "CURRENT_USER";
export const CURRENT_USER_LOADING = "CURRENT_USER_LOADING";
export const CURRENT_USER_ERROR = "CURRENT_USER_ERROR";

export interface ICurrentUserAction {
  type: typeof CURRENT_USER;
  apiState: Partial<IApiState>;
  payload: User;
}
export interface ICurrentUserLoading {
  type: typeof CURRENT_USER_LOADING;
  apiState: Partial<IApiState>;
}
export interface ICurrentUserActionError {
  type: typeof CURRENT_USER_ERROR;
  apiState: Partial<IApiState>;
}
export interface ILoginAction {
  type: typeof LOGIN_TYPE;
  apiState: Partial<IApiState>;
  payload: User;
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
  payload: User;
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
  | ILogout
  | ICurrentUserAction
  | ICurrentUserActionError
  | ICurrentUserLoading;

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
  IACurrentUser: IApiState;
}

export interface IAuth {
  apiState: Partial<IAuthState>;
  user?: User;
}
