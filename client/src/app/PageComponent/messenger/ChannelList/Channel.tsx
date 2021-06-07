import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { ASetCurrentChat } from "../../../redux/actions/chat";
import { Channel as ChannelContent } from "../../../redux/types/chat.type";

interface IChannel {
  channelItem: ChannelContent;
}

const Channel: FC<IChannel> = ({ channelItem }) => {
  const dispatch = useDispatch();

  const handleCurrentChannel = () => {
    dispatch(ASetCurrentChat(channelItem));
  };

  return (
    <div
      className="p-3 mt-2 cursor-pointer bg-dark-third rounded-2xl"
      onClick={() => handleCurrentChannel()}
    >
      {channelItem.type === "dual" ? (
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-center w-10 h-10 rounded-full text-dark-txt bg-dark-main">
            {channelItem.chatUser[0].user.username[0].toUpperCase()}
          </div>
          <p className="text-dark-txt">
            {channelItem.chatUser[0].user.username}
          </p>
        </div>
      ) : (
        <p>Group - {channelItem.chatUser.map((usr) => usr.user.username[0])}</p>
      )}
    </div>
  );
};

export default Channel;
