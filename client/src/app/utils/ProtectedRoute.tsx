import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { ACurrentUser } from "../redux/actions/auth";
import { IState } from "../redux/reducers/rootReducer";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const currentUser = useSelector((state: IState) => state.authReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ACurrentUser());
  }, []);
  console.log("curre", currentUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
