import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../app/PageComponent/Main";

import Login from "../app/PageComponent/login/Login";
import Register from "../app/PageComponent/register/Register";
import Navbar from "../app/components/Navbar/Navbar";
import NotFound from "../app/PageComponent/NotFound/NotFound";
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
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
