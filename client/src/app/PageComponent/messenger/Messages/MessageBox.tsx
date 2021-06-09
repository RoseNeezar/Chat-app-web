import React from "react";
import MessageInput from "./component/MessageInput";
import MessageContent from "./component/MessageContent";
import MessageHeader from "./component/MessageHeader";
import { useSelector } from "react-redux";
import { IState } from "../../../redux/reducers/rootReducer";

const MessageBox = () => {
  const currentChanel = useSelector(
    (state: IState) => state.chatReducer.currentChat
  );

  return (
    <div className="flex flex-col mt-4 rounded-lg shadow h-5/6 bg-dark-second text-dark-txt">
      {currentChanel ? (
        <>
          <div className="px-4 py-2 bg-dark-third rounded-t-2xl">
            <MessageHeader channel={currentChanel} />
          </div>
          <div className="h-full px-4 py-2 overflow-scroll ">
            <MessageContent channel={currentChanel} />
          </div>
          <div className="px-4 py-2 mt-auto bg-dark-third rounded-b-2xl ">
            <MessageInput channel={currentChanel} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-dark-txt">Start chatting</p>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
