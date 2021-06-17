import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../app/components/Navbar/Navbar";
import Login from "../app/PageComponent/login/Login";
import Main from "../app/PageComponent/Main";
import NotFound from "../app/PageComponent/NotFound/NotFound";
import Register from "../app/PageComponent/register/Register";
import ProtectAuthRoute from "../app/utils/ProtectAuthRoute";
import ProtectedRoute from "../app/utils/ProtectedRoute";

const App = () => {
  return (
    <Router basename="/">
      <Switch>
        <ProtectedRoute exact path="/">
          <Navbar />
          <Main />
        </ProtectedRoute>
        <Route exact path="/login">
          <Login />
        </Route>
        <ProtectAuthRoute exact path="/register">
          <Register />
        </ProtectAuthRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
