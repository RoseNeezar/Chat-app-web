import React, { FC } from "react";
import { Channel } from "../../../../redux/types/chat.type";
import MessagBubble from "./MessagBubble";

interface IMessageContent {
  channel: Channel;
}

const MessageContent: FC<IMessageContent> = ({ channel }) => {
  return (
    <div className="flex flex-col w-full ">
      {channel.message.map((msg) => {
        return <MessagBubble key={msg.id} message={msg} />;
      })}
    </div>
  );
};

export default MessageContent;
