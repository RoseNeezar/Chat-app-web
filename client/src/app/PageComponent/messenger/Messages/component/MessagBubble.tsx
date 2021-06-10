import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../../redux/reducers/rootReducer";
import { Message } from "../../../../redux/types/chat.type";
import tailwind from "tailwind-rn";
import { View } from "react-native";

interface IMessageBubble {
  message: Message;
}

const MessagBubble: FC<IMessageBubble> = ({ message }) => {
  const currentUser = useSelector(
    (state: IState) => state.authReducer.user?.username
  );
  return (
    <div
      className={`p-2 mb-4 text-sm  w-max ${
        currentUser === message.user.username
          ? "bg-dark-main ml-auto p-3"
          : "bg-dark-third"
      } rounded-2xl`}
    >
      {currentUser !== message.user.username && (
        <View style={tailwind("bg-purple-300 text-black uppercase")}>
          <span className="block font-semibold">{message.user.username}</span>
        </View>
      )}
      <span>{message.message}</span>
    </div>
  );
};

export default MessagBubble;
