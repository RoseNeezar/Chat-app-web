import React, { FC } from "react";
import { Message } from "../../../../redux/types/chat.type";

interface IMessageBubble {
  message: Message;
}

const MessagBubble: FC<IMessageBubble> = ({ message }) => {
  return (
    <div className="p-2 mb-4 text-sm bg-dark-third rounded-2xl">
      <span className="block font-semibold">{message.user.username}</span>
      <span>{message.message}</span>
    </div>
  );
};

export default MessagBubble;
