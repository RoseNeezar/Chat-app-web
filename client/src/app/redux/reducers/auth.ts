import { produce } from "immer";
import { defaultApiState } from "../../../types/defaultApiState";
import { AuthDispatchTypes, IAuth } from "../types/user.type";

export const initialState: IAuth = {
  apiState: {
    IALogin: defaultApiState,
    IARegister: defaultApiState,
    IACurrentUser: defaultApiState,
  },
  user: undefined,
};

const authReducer = produce(
  (draftState: IAuth = initialState, action: AuthDispatchTypes) => {
    switch (action.type) {
      case "LOGIN":
        draftState.user = action.payload;
        draftState.apiState.IALogin!.success = true;
        return;
      case "LOGIN_TYPE_LOADING":
        draftState.apiState.IALogin!.loading = true;
        return;
      case "LOGIN_TYPE_ERROR":
        draftState.apiState.IALogin!.error = action.apiState.error as Error;
        return;
      case "REGISTER":
        draftState.user = action.payload;
        draftState.apiState.IARegister!.success = true;
        return;
      case "REGISTER_TYPE_LOADING":
        draftState.apiState.IARegister!.loading = true;
        return;
      case "REGISTER_TYPE_ERROR":
        draftState.apiState.IARegister!.error = action.apiState.error as Error;
        return;
      case "LOGOUT":
        draftState.user = undefined;
        return;
      case "CURRENT_USER":
        draftState.user = action.payload;
        draftState.apiState.IACurrentUser!.success = true;
        return;
      case "CURRENT_USER_LOADING":
        draftState.apiState.IACurrentUser!.loading = true;
        return;
      case "CURRENT_USER_ERROR":
        draftState.apiState.IACurrentUser!.error = action.apiState
          .error as Error;
        return;
      default: {
        return draftState;
      }
    }
  }
);

export default authReducer;
