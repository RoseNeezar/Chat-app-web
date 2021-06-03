import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../../redux/reducers/rootReducer";

const MessageContent = () => {
  const currentUser = useSelector((state: IState) => state.authReducer.user);
  return (
    <div className="flex space-x-2">
      <div>
        <div className="p-2 mb-4 text-sm bg-gray-100 dark:bg-dark-third rounded-2xl">
          <span className="block font-semibold">John Doe</span>
          <span>{currentUser?.email}</span>
        </div>
        <div className="p-2 mb-4 text-sm bg-gray-100 dark:bg-dark-third rounded-2xl">
          <span className="block font-semibold">John Doe</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        </div>
        <div className="p-2 mb-4 text-sm bg-gray-100 dark:bg-dark-third rounded-2xl">
          <span className="block font-semibold">John Doe</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        </div>
        <div className="p-2 mb-4 text-sm bg-gray-100 dark:bg-dark-third rounded-2xl">
          <span className="block font-semibold">John Doe</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
