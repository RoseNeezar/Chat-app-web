import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ACurrentUser } from "../redux/actions/auth";
import useSocket from "../utils/socketConnect";
import FriendList from "./messenger/FriendList/FriendList";
import Messages from "./messenger/Messages/Messages";

const Main = () => {
  // useSocket();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ACurrentUser());
  }, []);
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
