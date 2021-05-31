import React from "react";
import MessageInput from "./component/MessageInput";
import MessageContent from "./component/MessageContent";

const Messages = () => {
  return (
    <div className="flex flex-col mt-4 rounded-lg shadow h-5/6 bg-dark-second text-dark-txt">
      <div className="px-4 py-2">
        <MessageContent />
      </div>

      <div className="px-4 py-2 mt-auto mb-6">
        <MessageInput />
      </div>
    </div>
  );
};

export default Messages;
