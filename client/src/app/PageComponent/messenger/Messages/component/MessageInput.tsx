import React from "react";

const MessageInput = () => {
  return (
    <div className="flex space-x-2 ">
      <div className="flex items-center justify-between flex-1 px-3 bg-gray-100 rounded-full dark:bg-dark-third">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 p-2 text-black bg-transparent outline-none"
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
