import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ACurrentUser } from "../redux/actions/auth";
import { AFetchChat } from "../redux/actions/chat";
import useSocket from "../utils/socketConnect";
import ChannelList from "./messenger/ChannelList/ChannelList";
import Messages from "./messenger/Messages/MessageBox";

const Main = () => {
  // useSocket();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AFetchChat());
  }, []);

  return (
    <div className="flex flex-row h-screen pt-10 bg-dark-main">
      <div className="flex-col hidden w-1/5 h-full pt-16 lg:flex">
        <ChannelList />
      </div>

      <div className="w-full h-full px-2 pt-32 lg:w-4/5 lg:pt-16">
        <Messages />
      </div>
    </div>
  );
};

export default Main;
