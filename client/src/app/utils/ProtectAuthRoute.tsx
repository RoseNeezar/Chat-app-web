import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RouteProps } from "react-router";
import { Route, Redirect } from "react-router-dom";
import { ACurrentUser } from "../redux/actions/auth";

const ProtectAuthRoute: FC<RouteProps> = ({ children, ...rest }) => {
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
    console.log("login", check);
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
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default ProtectAuthRoute;
