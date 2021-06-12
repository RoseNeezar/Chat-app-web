import { Dispatch, useEffect } from "react";
import socketClient from "socket.io-client";
import {
  AFetchChat,
  AReceivedMessage,
  ASetSocket,
} from "../redux/actions/chat";
import { Message, User } from "../redux/types/chat.type";

const useSocket = (user: User, dispatch: Dispatch<any>) => {
  useEffect(() => {
    dispatch(AFetchChat());
    const socket = socketClient.connect("http://localhost:3005/api", {
      path: "/api/socket.io",
    });
    dispatch(ASetSocket(socket));
    socket.emit("join", user);

    socket.on("received", (message: Message) => {
      dispatch(AReceivedMessage(message, user.id));
    });
  }, []);
};

export default useSocket;
