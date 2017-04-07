// @flow

import React from "react";
import { Route, IndexRoute, createRoutes } from "react-router";

import App from "./containers/App";
import Application from "./containers/Application";
import Dashboard from "./containers/Dashboard";
import Editor from "./containers/Editor";
import EditorList from "./containers/EditorList";
import EditorWrapper from "./containers/EditorWrapper";
import EditorNew from "./containers/EditorNew";
import NotFoundPage from "./containers/NotFoundPage";

export default createRoutes(
  <Route component={App}>
    <Route path="/" component={Dashboard} />
    <Route path="/applications/:id" component={Application} />
    <Route path="/editor" component={EditorWrapper}>
      <IndexRoute component={EditorList} />
      <Route path="/editor/new" component={EditorNew} />
      <Route path="/editor/:id" component={Editor} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
