import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
