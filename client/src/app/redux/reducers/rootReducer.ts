import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { IChat } from "../types/chat.type";
import { IAuth } from "../types/user.type";
import authReducer from "./auth";
import chatReducer from "./chat";

export type IState = {
  authReducer: IAuth;
  chatReducer: IChat;
};

const RootReducer = (state: IState | undefined, action: AnyAction | any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    default: {
      const combineReducer = combineReducers({
        authReducer,
        chatReducer,
      });
      return combineReducer(state, action);
    }
  }
};
export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
