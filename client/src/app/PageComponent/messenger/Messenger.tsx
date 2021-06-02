import React from "react";
import FriendList from "./FriendList/FriendList";
import Messages from "./Messages/Messages";

const Messenger = () => {
  return (
    <>
      <div className="fixed top-0 left-0 flex-col hidden w-1/5 h-full pt-16 xl:flex">
        <FriendList />
      </div>

      <div className="w-full h-full px-2 pt-32 xl:w-4/5 xl:ml-16 lg:pt-16">
        <Messages />
      </div>
    </>
  );
};

export default Messenger;
