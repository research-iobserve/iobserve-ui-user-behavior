// @flow

import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";

import configureStore from "./store";
import routes from "./routes";
import { State } from "./models";

const store = configureStore(new State());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
