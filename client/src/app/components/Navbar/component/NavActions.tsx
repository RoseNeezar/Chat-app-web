import React from "react";

const NavActions = () => {
  return (
    <>
      <ul className="flex items-center justify-center mx-4">
        <li>
          <div
            className="relative grid p-3 mx-1 text-xl rounded-full cursor-pointer bg-dark-third text-dark-txt hover:bg-gray-300"
            id="dark-mode-toggle"
          >
            <i className="bx bxs-moon"></i>
          </div>
        </li>
      </ul>
    </>
  );
};

export default NavActions;
