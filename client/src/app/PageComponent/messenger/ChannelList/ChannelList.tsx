import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../redux/reducers/rootReducer";
import Channel from "./Channel";

const ChannelList = () => {
  const channels = useSelector((state: IState) => state.chatReducer.channels);
  return (
    <div className="mt-4 ml-2 rounded-xl bg-dark-second h-5/6">
      <div className="flex flex-row justify-between w-full h-10 p-2 border-b border-dark-third">
        <p className="text-lg text-dark-txt">Friends</p>
        <div
          className="flex items-center p-0.5 mx-1 text-xl rounded-full cursor-pointer bg-dark-third text-dark-txt hover:bg-gray-300"
          id="dark-mode-toggle"
        >
          <i className="bx bx-plus"></i>
        </div>
      </div>
      <div className="p-2 overflow-scroll h-big mb-30">
        {channels?.map((ch) => {
          return <Channel key={ch.id} channelItem={ch.channel} />;
        })}
      </div>
    </div>
  );
};

export default ChannelList;
