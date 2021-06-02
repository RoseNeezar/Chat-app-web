import { AnyAction, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import authReducer from "./auth";
import { IAuth } from "../types/user.type";

export type IState = {
  authReducer: IAuth;
};

const RootReducer = (state: IState | undefined, action: AnyAction | any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    default: {
      const combineReducer = combineReducers({
        authReducer,
      });
      return combineReducer(state, action);
    }
  }
};
export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
