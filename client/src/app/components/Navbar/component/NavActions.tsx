import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ALogout } from "../../../redux/actions/auth";
import { IState } from "../../../redux/reducers/rootReducer";

const NavActions = () => {
  const currentUser = useSelector((state: IState) => state.authReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(ALogout(history));
  };
  return (
    <>
      <ul className="flex items-center justify-center mx-4">
        <li>
          <p className="text-dark-txt">{currentUser?.username}</p>
        </li>
        <li>
          <div
            className="relative grid p-3 mx-1 text-xl rounded-full cursor-pointer bg-dark-third text-dark-txt hover:bg-gray-300"
            id="dark-mode-toggle"
            onClick={() => handleLogout()}
          >
            <i className="bx bx-power-off"></i>
          </div>
        </li>
      </ul>
    </>
  );
};

export default NavActions;
