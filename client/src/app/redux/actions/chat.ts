import { Dispatch } from "react";
import agent from "../../api/agent";
import {
  Channel,
  ChatDispatchTypes,
  FETCH_CHATS_TYPES,
  SET_CURRENT_CHAT_TYPES,
} from "../types/chat.type";

export const AFetchChat =
  () => async (dispatch: Dispatch<ChatDispatchTypes>) => {
    try {
      const result = await agent.ChatService.fetchChats();
      result.forEach((chat) => {
        chat.channel.chatUser.forEach((user) => {
          user.user.status = "offline";
        });
        chat.channel.message.reverse();
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
  (channel: Channel) => (dispatch: Dispatch<ChatDispatchTypes>) => {
    dispatch({ type: SET_CURRENT_CHAT_TYPES, payload: channel });
  };
