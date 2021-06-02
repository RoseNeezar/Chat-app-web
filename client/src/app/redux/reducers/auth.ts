import { defaultApiState } from "../../../types/defaultApiState";
import { AuthDispatchTypes, IAuth } from "../types/user.type";

export const initialState: IAuth = {
  apiState: {
    IALogin: defaultApiState,
    IARegister: defaultApiState,
  },
  user: undefined,
};

const authReducer = (
  state: IAuth | undefined = initialState,
  action: AuthDispatchTypes
): IAuth => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        apiState: { IALogin: { ...defaultApiState, success: true } },
      };
    case "LOGIN_TYPE_LOADING":
      return {
        ...state,
        apiState: { IALogin: { ...defaultApiState, loading: true } },
      };
    case "LOGIN_TYPE_ERROR":
      return {
        ...state,
        apiState: {
          IALogin: {
            ...defaultApiState,
            error: action.apiState.error as Error,
          },
        },
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
        apiState: { IARegister: { ...defaultApiState, success: true } },
      };
    case "REGISTER_TYPE_LOADING":
      return {
        ...state,
        apiState: { IARegister: { ...defaultApiState, loading: true } },
      };
    case "REGISTER_TYPE_ERROR":
      return {
        ...state,
        apiState: {
          IARegister: {
            ...defaultApiState,
            error: action.apiState.error as Error,
          },
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: undefined,
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
