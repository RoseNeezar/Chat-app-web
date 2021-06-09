import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import agent from "../../api/agent";
import {
  AuthDispatchTypes,
  CURRENT_USER,
  CURRENT_USER_ERROR,
  CURRENT_USER_LOADING,
  ILogin,
  IRegister,
  LOGIN_TYPE,
  LOGIN_TYPE_ERROR,
  LOGIN_TYPE_LOADING,
  LOGOUT,
  REGISTER_TYPE,
  REGISTER_TYPE_ERROR,
  REGISTER_TYPE_LOADING,
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
      const user = await agent.AuthService.login(param);
      dispatch({
        type: LOGIN_TYPE,
        payload: user,
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
      const user = await agent.AuthService.register(param);
      dispatch({
        type: REGISTER_TYPE,
        payload: user,
        apiState: {
          success: true,
        },
      });

      history.push("/login");
    } catch (error) {
      dispatch({
        type: REGISTER_TYPE_ERROR,
        apiState: {
          error: error.response.data,
        },
      });
    }
  };

export const ALogout =
  (history: RouteComponentProps["history"]) =>
  async (dispatch: Dispatch<AuthDispatchTypes>) => {
    await agent.AuthService.logout();
    dispatch({ type: LOGOUT });
    history.push("/login");
  };

export const ACurrentUser =
  () => async (dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
      dispatch({
        type: CURRENT_USER_LOADING,
        apiState: {
          loading: true,
        },
      });
      const user = await agent.AuthService.currentUser();
      dispatch({
        type: CURRENT_USER,
        payload: user,
        apiState: {
          success: true,
        },
      });
    } catch (error) {
      dispatch({
        type: CURRENT_USER_ERROR,
        apiState: {
          error: error.response.data,
        },
      });
    }
  };
