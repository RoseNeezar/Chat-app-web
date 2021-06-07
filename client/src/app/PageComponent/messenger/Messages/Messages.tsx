import React from "react";
import MessageInput from "./component/MessageInput";
import MessageContent from "./component/MessageContent";
import MessageHeader from "./component/MessageHeader";

const Messages = () => {
  return (
    <div className="flex flex-col mt-4 rounded-lg shadow h-5/6 bg-dark-second text-dark-txt">
      <div className="px-4 py-2 bg-dark-third rounded-t-2xl">
        <MessageHeader />
      </div>
      <div className="h-full px-4 py-2 overflow-scroll ">
        <MessageContent />
      </div>
      <div className="px-4 py-2 mt-auto bg-dark-third rounded-b-2xl ">
        <MessageInput />
      </div>
    </div>
  );
};

export default Messages;
