import { Transition, Dialog } from "@headlessui/react";
import React, { FormEvent, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import agent from "../../../api/agent";
import { IState } from "../../../redux/reducers/rootReducer";
import { User } from "../../../redux/types/chat.type";
import Channel from "./Channel";

const ChannelList = () => {
  const channels = useSelector((state: IState) => state.chatReducer.channels);
  let [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<User[]>([]);

  const searchFriends = (e: FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;
    agent.ChatService.searchUser(event.value || "")
      .then((res) => setSuggestions(res))
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    setSuggestions([]);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="mt-4 ml-2 rounded-xl bg-dark-second h-5/6">
      <div className="flex flex-row justify-between w-full h-10 p-2 border-b border-dark-third">
        <p className="text-lg text-dark-txt">Friends</p>
        <div
          className="flex items-center p-0.5 mx-1 text-xl rounded-full cursor-pointer bg-dark-third text-dark-txt hover:bg-gray-300"
          id="dark-mode-toggle"
          onClick={openModal}
        >
          <i className="bx bx-plus"></i>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-dark-main rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-dark-txt"
                >
                  Search for user
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    onInput={(e) => searchFriends(e)}
                    type="text"
                    placeholder="Search by username"
                    className="w-full p-2 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 "
                  />
                </div>

                <div className="mt-4">
                  {suggestions.map((res) => {
                    return (
                      <div className="flex flex-row justify-between p-1 mb-1 rounded-md bg-dark-third">
                        <p className="pl-2 text-dark-txt">{res.username}</p>
                        <button className="p-1 mr-1 text-sm rounded-md hover:text-black hover:bg-gray-200 text-dark-txt bg-dark-main">
                          Add
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <div className="p-2 overflow-scroll h-big mb-30">
        {channels?.map((ch) => {
          return <Channel key={ch.id} channelItem={ch.channel} />;
        })}
      </div>
    </div>
  );
};

export default ChannelList;
