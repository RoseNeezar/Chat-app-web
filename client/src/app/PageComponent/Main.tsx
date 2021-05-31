import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useSocket from "../utils/socketConnect";
import FriendList from "./messenger/FriendList/FriendList";
import Messages from "./messenger/Messages/Messages";

const Main = () => {
  const [state, setState] = useState(false);
  let history = useHistory();
  function handleClick() {
    history.push("/about");
  }
  useSocket();
  return (
    <div className="flex flex-row h-screen bg-dark-main">
      <div className="flex-col hidden w-1/5 h-full pt-16 lg:flex">
        <FriendList />
      </div>

      <div className="w-full h-full px-2 pt-32 lg:w-4/5 lg:pt-16">
        <Messages />
      </div>
    </div>
  );
};

export default Main;
