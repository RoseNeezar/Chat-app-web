import React from "react";
import ChannelList from "./ChannelList/ChannelList";
import MessageBox from "./Messages/MessageBox";

const Messenger = () => {
  return (
    <>
      <div className="fixed top-0 left-0 flex-col hidden w-1/5 h-full pt-16 xl:flex">
        <ChannelList />
      </div>

      <div className="w-full h-full px-2 pt-32 xl:w-4/5 xl:ml-16 lg:pt-16">
        <MessageBox />
      </div>
    </>
  );
};

export default Messenger;
