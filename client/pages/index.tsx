import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../app/PageComponent/Main";
import About from "../app/PageComponent/About";

const App = () => {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
