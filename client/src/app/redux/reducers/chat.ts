import { Channel, ChatDispatchTypes, IChat } from "../types/chat.type";

const initialState: IChat = {
  channels: [],
  currentChat: undefined,
  socket: null,
};

const chatReducer = (
  state: IChat | undefined = initialState,
  action: ChatDispatchTypes
): IChat => {
  switch (action.type) {
    case "FETCH_CHATS":
      return {
        ...state,
        channels: action.payload,
      };
    case "SET_CURRENT_CHAT": {
      if (typeof action.payload === "undefined") {
        return {
          ...state,
          currentChat: undefined,
        };
      }
      return {
        ...state,
        currentChat: action.payload,
      };
    }
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "RECEIVED_MESSAGE": {
      const { message } = action.payload;
      let currentChatCopy = { ...state.currentChat } as Channel;

      const chatsCopy = state.channels?.map((chat) => {
        if (message.channelId === chat.channelId) {
          if (message.channelId === currentChatCopy.id) {
            currentChatCopy = {
              ...currentChatCopy,
              message: [...[message], ...currentChatCopy.message],
            };
          }

          return {
            ...chat,
            channel: {
              ...chat.channel,
              message: [...[message], ...chat.channel.message],
            },
          };
        }

        return chat;
      });

      return {
        ...state,
        channels: chatsCopy,
        currentChat: currentChatCopy,
      };
    }

    case "PAGINATE_MESSAGES": {
      const { messages, id, pagination } = action.payload;

      let currentChatCopy = { ...state.currentChat } as Channel;

      const chatsCopy = state.channels!.map((chat) => {
        if (chat.channelId === id) {
          const shifted = [...chat.channel.message, ...messages];

          currentChatCopy = {
            ...currentChatCopy,
            message: shifted,
            pagination: pagination,
          };
          return {
            ...chat,
            channel: {
              ...chat.channel,
              message: shifted,
              pagination: pagination,
            },
          };
        }

        return chat;
      });

      return {
        ...state,
        channels: chatsCopy,
        currentChat: currentChatCopy,
      };
    }

    case "CREATE_CHAT": {
      console.log("chat: new channel", action.payload, "old", state.channels);
      return {
        ...state,
        channels: [...state.channels!, ...[action.payload]],
      };
    }
    case "DELETE_CURRENT_CHAT": {
      return {
        ...state,
        channels: state.channels!.filter(
          (chat) => chat.channelId !== action.payload
        ),
        currentChat:
          state.currentChat?.id === action.payload
            ? undefined
            : state.currentChat,
      };
    }

    default: {
      return state;
    }
  }
};

export default chatReducer;
