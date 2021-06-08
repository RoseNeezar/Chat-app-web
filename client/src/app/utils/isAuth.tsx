import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACurrentUser } from "../redux/actions/auth";
import { IState } from "../redux/reducers/rootReducer";

const isAuth = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IState) => state.authReducer.user);
  useEffect(() => {
    dispatch(ACurrentUser());
  }, []);

  return { currentUser };
};

export default isAuth;
