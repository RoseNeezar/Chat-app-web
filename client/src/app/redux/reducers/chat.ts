import { ChatDispatchTypes, IChat } from "../types/chat.type";
import { produce } from "immer";

const initialState: IChat = {
  channels: [],
  currentChat: undefined,
  socket: null,
};

const chatReducer = produce(
  (draftState: IChat = initialState, action: ChatDispatchTypes) => {
    switch (action.type) {
      case "FETCH_CHATS":
        draftState.channels = action.payload;
        return;
      case "SET_CURRENT_CHAT": {
        if (typeof action.payload === "undefined") {
          draftState.currentChat = undefined;
          return;
        }
        draftState.currentChat = action.payload;
        return;
      }
      case "SET_SOCKET":
        draftState.socket = action.payload;
        return;

      case "RECEIVED_MESSAGE": {
        const { message } = action.payload;

        draftState.channels = draftState.channels?.map((chat) => {
          if (message.channelId === chat.channelId) {
            if (message.channelId === chat.channelId) {
              draftState.currentChat?.message.unshift(message);
            }
          }
          chat.channel.message.push(message);
          return chat;
        });
        return;
      }

      case "PAGINATE_MESSAGES": {
        const { messages, id, pagination } = action.payload;

        draftState.channels = draftState.channels?.map((chat) => {
          if (chat.channelId === id) {
            draftState.currentChat?.message.push(...messages);
            draftState.currentChat!.pagination = pagination;
            chat.channel.message.push(...messages);
            chat.channel.pagination = pagination;
          }
          return chat;
        });
        return;
      }

      case "CREATE_CHAT": {
        draftState.channels?.push(action.payload);
        return;
      }
      case "DELETE_CURRENT_CHAT": {
        draftState.channels = draftState.channels?.filter(
          (chat) => chat.channelId !== action.payload
        );
        if (draftState.currentChat?.id === action.payload) {
          draftState.currentChat = undefined;
        }
        return;
      }

      default: {
        return draftState;
      }
    }
  }
);

export default chatReducer;
