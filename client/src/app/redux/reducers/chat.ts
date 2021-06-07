import { ChatDispatchTypes, IChat } from "../types/chat.type";

const initialState: IChat = {
  channels: undefined,
  currentChat: undefined,
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
    case "SET_CURRENT_CHAT":
      return {
        ...state,
        currentChat: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default chatReducer;
