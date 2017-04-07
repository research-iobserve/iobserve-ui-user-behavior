// @flow

import { match } from "react-router";

import routes from "./routes";
import App from "./containers/App";
import Dashboard from "./containers/Dashboard";
import NotFoundPage from "./containers/NotFoundPage";

describe("match routes", () => {
  it("matches the correct / route", () => {
    match({ routes, location: "/" }, (error, redirectLocation, renderProps) => {
      expect(renderProps).toBeDefined();
      expect(renderProps.components).toEqual([App, Dashboard]);
    });
  });

  it("matches the correct not found route", () => {
    match(
      { routes, location: "/404" },
      (error, redirectLocation, renderProps) => {
        expect(renderProps).toBeDefined();
        expect(renderProps.components).toEqual([App, NotFoundPage]);
      }
    );
  });
});
