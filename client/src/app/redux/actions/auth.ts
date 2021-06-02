import { NextRouter } from "next/dist/client/router";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import agent from "../../api/authAgent";
import {
  ILogin,
  AuthDispatchTypes,
  LOGIN_TYPE,
  IRegister,
  REGISTER_TYPE,
  LOGOUT,
  REGISTER_TYPE_LOADING,
  REGISTER_TYPE_ERROR,
  LOGIN_TYPE_LOADING,
  LOGIN_TYPE_ERROR,
} from "../types/user.type";

export const ALogin =
  (param: ILogin, history: RouteComponentProps["history"]) =>
  async (dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
      dispatch({
        type: LOGIN_TYPE_LOADING,
        apiState: {
          loading: true,
        },
      });
      const result = await agent.AuthService.login(param);
      dispatch({
        type: LOGIN_TYPE,
        payload: result,
        apiState: {
          success: true,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: LOGIN_TYPE_ERROR,
        apiState: {
          error: error.response.data,
        },
      });
    }
  };

export const ARegister =
  (param: IRegister, history: RouteComponentProps["history"]) =>
  async (dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
      dispatch({
        type: REGISTER_TYPE_LOADING,
        apiState: {
          loading: true,
        },
      });
      const result = await agent.AuthService.register(param);
      dispatch({
        type: REGISTER_TYPE,
        payload: result,
        apiState: {
          success: true,
        },
      });

      history.push("/login");
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: REGISTER_TYPE_ERROR,
        apiState: {
          error: error.response.data,
        },
      });
    }
  };

export const ALogout =
  (router: NextRouter) => (dispatch: Dispatch<AuthDispatchTypes>) => {
    agent.AuthService.logout();
    dispatch({ type: LOGOUT });
    router.push("/login");
  };
