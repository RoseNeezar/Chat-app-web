import { Dispatch } from "react";
import agent from "../../api/agent";
import {
  Channel,
  ChatDispatchTypes,
  CREATE_CHAT,
  FETCH_CHATS_TYPES,
  IChannel,
  Message,
  RECEIVED_MESSAGE,
  SET_CURRENT_CHAT,
  SET_SOCKET,
} from "../types/chat.type";

export const AFetchChat =
  () => async (dispatch: Dispatch<ChatDispatchTypes>) => {
    try {
      const result = await agent.ChatService.fetchChats();
      result.forEach((chat) => {
        chat.channel.chatUser.forEach((user) => {
          user.user.status = "offline";
        });
      });

      dispatch({
        type: FETCH_CHATS_TYPES,
        payload: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const ASetCurrentChat =
  (channel: Channel | undefined) => (dispatch: Dispatch<ChatDispatchTypes>) => {
    dispatch({ type: SET_CURRENT_CHAT, payload: channel });
  };

export const ASetSocket =
  (socket: SocketIOClient.Socket) =>
  (dispatch: Dispatch<ChatDispatchTypes>) => {
    dispatch({ type: SET_SOCKET, payload: socket });
  };

export const AReceivedMessage =
  (message: Message, userId: number) =>
  (dispatch: Dispatch<ChatDispatchTypes>) => {
    dispatch({ type: RECEIVED_MESSAGE, payload: { message, userId } });
  };

export const APaginateMessages =
  (id: number, page: number) =>
  async (dispatch: Dispatch<ChatDispatchTypes>) => {
    try {
      const result = await agent.ChatService.paginateMessages(id, page);
      const { messages, pagination } = result;
      if (typeof messages != "undefined" && messages.length > 0) {
        const payload = { messages, id, pagination };
        dispatch({ type: "PAGINATE_MESSAGES", payload: payload });
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

export const ACreateChat =
  (chat: IChannel) => (dispatch: Dispatch<ChatDispatchTypes>) => {
    dispatch({ type: CREATE_CHAT, payload: chat });
  };
