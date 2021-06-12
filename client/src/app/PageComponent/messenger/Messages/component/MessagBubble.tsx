import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../../redux/reducers/rootReducer";
import { Message } from "../../../../redux/types/chat.type";

interface IMessageBubble {
  message: Message;
}

const MessagBubble: FC<IMessageBubble> = ({ message }) => {
  const currentUser = useSelector(
    (state: IState) => state.authReducer.user?.username
  );
  return (
    <div
      className={`w-1/2  ${currentUser === message.user.username && "ml-auto"}`}
    >
      <div
        className={`p-2 mb-4 text-sm  max-w-max break-words ${
          currentUser === message.user.username
            ? "bg-dark-main ml-auto p-3 text-right"
            : "bg-dark-third"
        } rounded-2xl`}
      >
        {currentUser !== message.user.username && (
          <div className="p-1 rounded-md text-dark-txt bg-dark-main">
            <span className="block font-semibold">{message.user.username}</span>
          </div>
        )}
        <span>{message.message}</span>
      </div>
    </div>
  );
};

export default MessagBubble;
