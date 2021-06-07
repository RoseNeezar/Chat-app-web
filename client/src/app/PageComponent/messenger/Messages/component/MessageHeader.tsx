import React, { FC } from "react";
import { Channel } from "../../../../redux/types/chat.type";

interface IMessageHeader {
  channel: Channel;
}

const MessageHeader: FC<IMessageHeader> = ({ channel }) => {
  return (
    <div className="flex flex-row">
      {channel.chatUser.map((usr) => {
        return (
          <div key={usr.id} className="px-4 py-2 bg-dark-main rounded-2xl">
            <p>{usr.user.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageHeader;
