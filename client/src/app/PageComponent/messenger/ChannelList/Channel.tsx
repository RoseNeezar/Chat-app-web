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
      className="p-3 mt-2 bg-dark-third rounded-2xl"
      onClick={() => handleCurrentChannel()}
    >
      {channelItem.type === "dual" ? (
        <p>{channelItem.chatUser[0].user.username}</p>
      ) : (
        <p>Group - {channelItem.chatUser.map((usr) => usr.user.username[0])}</p>
      )}
    </div>
  );
};

export default Channel;
