import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../../redux/reducers/rootReducer";
import { Channel } from "../../../../redux/types/chat.type";
import MessagBubble from "./MessagBubble";

interface IMessageContent {
  channel: Channel;
}

const MessageContent: FC<IMessageContent> = ({ channel }) => {
  return (
    <div className="flex flex-col max-w-max">
      {channel.message.map((msg) => {
        return <MessagBubble key={msg.id} message={msg} />;
      })}
    </div>
  );
};

export default MessageContent;
