import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { ACurrentUser } from "../redux/actions/auth";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const [isLogged, setIsLogged] = useState(true);
  const dispatch = useDispatch();

  const isAuth = async () => {
    const check = await axios
      .get("/auth/me")
      .then((user) => {
        return true;
      })
      .catch((err) => {
        return false;
      });

    setIsLogged(check);
  };
  useEffect(() => {
    dispatch(ACurrentUser());
    isAuth();
  }, [isAuth, setIsLogged]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
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
