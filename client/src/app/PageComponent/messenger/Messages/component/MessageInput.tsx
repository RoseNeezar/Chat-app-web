import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../../redux/reducers/rootReducer";
import {
  Channel,
  ChatUser,
  Message,
  User2,
} from "../../../../redux/types/chat.type";

interface IMessageInput {
  channel: Channel;
}

const MessageInput: FC<IMessageInput> = ({ channel }) => {
  const socket = useSelector((state: IState) => state.chatReducer.socket);
  const currentUser = useSelector((state: IState) => state.authReducer.user);

  const [message, setMessage] = useState("");

  const handleMessage = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.length > 0) {
      const msg: Partial<Message> & { toUserId: ChatUser[] } = {
        type: "text",
        channelId: channel?.id,
        fromUserId: currentUser?.id as number,
        user: currentUser as User2,
        message,
        toUserId: channel.chatUser,
      };
      socket?.emit("message", msg);

      setMessage("");
    }
  };
  return (
    <div className="flex space-x-2 ">
      <div className="flex items-center justify-between flex-1 px-3 bg-gray-100 rounded-full dark:bg-dark-third">
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 p-2 text-black bg-transparent outline-none"
          value={message}
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleSendMessage(e)}
        />
        <div className="flex items-center justify-center space-x-0">
          <span className="grid text-xl text-gray-500 rounded-full cursor-pointer w-7 h-7 place-items-center hover:bg-gray-200 dark:text-dark-txt dark:hover:bg-dark-second">
            <i className="bx bx-happy-heart-eyes"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
