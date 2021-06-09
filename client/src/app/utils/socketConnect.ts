import { Dispatch, useEffect } from "react";
import socketClient from "socket.io-client";
import {
  AFetchChat,
  AReceivedMessage,
  ASetSocket,
} from "../redux/actions/chat";
import { IUserContent } from "../redux/types/user.type";

const useSocket = (user: IUserContent, dispatch: Dispatch<any>) => {
  useEffect(() => {
    dispatch(AFetchChat());
    const socket = socketClient.connect("http://localhost:3005/api", {
      path: "/api/socket.io",
    });
    dispatch(ASetSocket(socket));
    socket.emit("join", user);
    // socket.emit("message", { msg: "hey from client" });
    // socket.on("received", (message: any) => {
    //   console.log("message", message);
    //   dispatch(AReceivedMessage(message, user.id));
    // });
  }, []);
};

export default useSocket;
