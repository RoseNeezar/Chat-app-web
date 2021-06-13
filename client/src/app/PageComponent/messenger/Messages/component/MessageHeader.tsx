import { Menu, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import agent from "../../../../api/agent";
import { IState } from "../../../../redux/reducers/rootReducer";
import { Channel } from "../../../../redux/types/chat.type";

interface IMessageHeader {
  channel: Channel;
}

const MessageHeader: FC<IMessageHeader> = ({ channel }) => {
  const socket = useSelector((state: IState) => state.chatReducer.socket);

  const HandleDeleteChannel = () => {
    agent.ChatService.deleteChannel(channel!.id)
      .then((data) => socket?.emit("delete-channel", data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="relative flex flex-row">
      {channel.chatUser.map((usr) => {
        return (
          <div key={usr.id} className="px-4 py-2 bg-dark-main rounded-2xl">
            <p>{usr.user.username}</p>
          </div>
        );
      })}
      <div className="absolute top-0 right-0 z-50 w-56 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="flex items-center justify-center p-2 mx-1 text-xl rounded-full cursor-pointer bg-dark-main text-dark-txt hover:bg-gray-300"
              id="dark-mode-toggle"
            >
              <i className="bx bxs-exit"></i>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-dark-main ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className="flex items-center w-full h-auto px-2 py-2 text-sm rounded-md hover:bg-gray-200 hover:text-black"
                    onClick={HandleDeleteChannel}
                  >
                    Delete chat
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default MessageHeader;
