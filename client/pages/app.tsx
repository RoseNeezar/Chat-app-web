import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NextLink from "next/link";
import Main from "../app/PageComponent/Main";
import About from "../app/PageComponent/About";

const App = () => {
  return (
    <Router basename="/app">
      <div>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <NextLink href="/settings">NEXT: Settings (SSR)</NextLink>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
