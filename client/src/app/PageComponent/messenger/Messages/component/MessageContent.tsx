import dayjs from "dayjs";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, SectionList } from "react-native";
import { useDispatch } from "react-redux";
import { APaginateMessages } from "../../../../redux/actions/chat";
import { Channel, Message } from "../../../../redux/types/chat.type";
import MessagBubble from "./MessagBubble";

interface IMessageContent {
  channel: Channel;
}
interface IMessageOrder {
  title: string;
  data: Message[];
}

const MessageContent: FC<IMessageContent> = ({ channel }) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [spinner, setSpinner] = useState(false);
  const messageListRef = useRef<SectionList<any> | any>(null);

  const MessageOrder = (arr: Message[]) => {
    const DATA = Object.values(
      arr.reduce((acc: any, item) => {
        if (!acc[dayjs(item.createAt).format("DD/MM/YYYY")]) {
          acc[dayjs(item.createAt).format("DD/MM/YYYY")] = {
            title: dayjs(item.createAt).format("DD/MM/YYYY"),
            data: [],
          };
        }
        acc[dayjs(item.createAt).format("DD/MM/YYYY")].data.unshift(item);
        return acc;
      }, {})
    );
    return DATA as IMessageOrder[];
  };

  const FetchMoreMessage = () => {
    const pagination = channel?.pagination;
    const page = typeof pagination === "undefined" ? "1" : pagination.page;

    setSpinner(true);
    setTimeout(() => {
      dispatch(APaginateMessages(channel.id, parseInt(page) + 1));
      setSpinner(false);
    }, 1000);
  };

  const scrollToBottom = () => {
    messageListRef.current.getScrollableNode().scrollTop = 0;
  };

  const invertedWheelEvent = useCallback((e) => {
    messageListRef.current!.getScrollableNode().scrollTop -= e.deltaY;
    e.preventDefault();
  }, []);

  useEffect(() => {
    const currentRef = messageListRef.current;
    if (currentRef != null) {
      currentRef
        .getScrollableNode()
        .addEventListener("wheel", invertedWheelEvent);
      currentRef.setNativeProps({
        style: {
          transform: "translate3d(0,0,0) scaleY(-1)",
        },
      });
    }

    return () => {
      if (currentRef != null && currentRef.getScrollableNode() !== undefined) {
        currentRef
          .getScrollableNode()
          .removeEventListener("wheel", invertedWheelEvent);
      }
    };
  }, [messageListRef, invertedWheelEvent, MessageOrder]);

  useEffect(() => {
    scrollToBottom();
  }, [channel.id]);

  return (
    <div className="relative flex w-full h-full overflow-hidden justify-items-start">
      <div ref={messagesEndRef} />
      {spinner && (
        <div className="absolute top-0 left-0 w-5 h-5 ">
          <ActivityIndicator />
        </div>
      )}
      <SectionList
        ref={messageListRef}
        extraData={channel.message}
        inverted
        contentContainerStyle={{
          flexDirection: "column-reverse",
          marginTop: "auto",
        }}
        onEndReached={() => FetchMoreMessage()}
        onEndReachedThreshold={0.001}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id.toString()}
        sections={MessageOrder(channel.message)}
        renderItem={({ item }) => <MessagBubble key={item.id} message={item} />}
      />
    </div>
  );
};

export default MessageContent;
