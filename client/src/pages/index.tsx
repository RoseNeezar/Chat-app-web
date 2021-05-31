import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../app/PageComponent/Main";

import Login from "../app/PageComponent/login/Login";
import Register from "../app/PageComponent/register/Register";
import Navbar from "../app/components/Navbar/Navbar";

const App = () => {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Main />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
