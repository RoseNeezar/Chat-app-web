import { useEffect } from "react";
import socketClient from "socket.io-client";

const useSocket = () => {
  useEffect(() => {
    const socket = socketClient.connect("http://127.0.0.1:5050");
    socket.on("message", (msg: string) => {
      console.log("SEND IT");
      console.log(msg);
    });
    socket.emit("message", { msg: "hey" });
  }, []);
};

export default useSocket;
