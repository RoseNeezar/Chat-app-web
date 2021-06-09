import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../redux/reducers/rootReducer";
import useSocket from "../utils/socketConnect";
import ChannelList from "./messenger/ChannelList/ChannelList";
import Messages from "./messenger/Messages/MessageBox";

const Main = () => {
  const currentUser = useSelector((state: IState) => state.authReducer.user);

  const dispatch = useDispatch();

  useSocket(currentUser!, dispatch);
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
