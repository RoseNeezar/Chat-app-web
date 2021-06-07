import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../../redux/reducers/rootReducer";
import MessagBubble from "./MessagBubble";

const MessageContent = () => {
  return (
    <div className="flex space-x-2">
      <MessagBubble />
    </div>
  );
};

export default MessageContent;
