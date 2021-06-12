import dayjs from "dayjs";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { SectionList } from "react-native";
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
    console.log("PAGIN");
    setTimeout(() => {
      dispatch(APaginateMessages(channel.id, parseInt(page) + 1));
    }, 1000);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const ref = useRef<any>(null);

  const invertedWheelEvent = useCallback((e) => {
    ref.current!.getScrollableNode().scrollTop -= e.deltaY;
    e.preventDefault();
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
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
  }, [ref, invertedWheelEvent, MessageOrder]);

  useEffect(() => {
    scrollToBottom();
  }, [channel.message]);

  return (
    <div id="scrollableDiv" className="flex w-full h-full justify-items-start ">
      <div ref={messagesEndRef} />
      <SectionList
        ref={ref}
        extraData={channel.message}
        inverted
        contentContainerStyle={{
          flexDirection: "column-reverse",
          marginTop: "auto",
        }}
        onEndReached={() => console.log("pagin")}
        onEndReachedThreshold={0.08}
        keyExtractor={(item, index) => index.toString()}
        sections={MessageOrder(channel.message)}
        renderItem={({ item }) => <MessagBubble key={item.id} message={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <>
            <div>{title}</div>
          </>
        )}
      />
    </div>
  );
};

export default MessageContent;
