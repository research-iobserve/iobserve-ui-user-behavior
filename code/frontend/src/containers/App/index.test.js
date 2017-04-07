// @flow

import React from "react";
import { shallow } from "enzyme";

import { App } from "./index";
import { SettingsState } from "../../models";

describe("<App />", () => {
  it("should render the header", () => {
    const renderedComponent = shallow(
      <App changeLayout={() => {}} settings={new SettingsState()} />
    );

    expect(renderedComponent.find("Header").length).toBe(1);
  });

  it("should render its children", () => {
    const children = <h1>Test</h1>;
    const renderedComponent = shallow(
      <App changeLayout={() => {}} settings={new SettingsState()}>
        {children}
      </App>
    );

    expect(renderedComponent.contains(children)).toBe(true);
  });
});
