// @flow

import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Header from "./index";
import { SettingsState } from "../../models";

describe("<Header />", () => {
  it("should render", () => {
    const tree = renderer
      .create(
        <Header changeSettings={() => {}} settings={new SettingsState()} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should open and close on toggle", () => {
    const renderedComponent = shallow(
      <Header changeSettings={() => {}} settings={new SettingsState()} />
    );

    expect(renderedComponent.state().isOpen).toBe(false);
    renderedComponent.find("NavbarToggler").simulate("click");
    expect(renderedComponent.state().isOpen).toBe(true);
    renderedComponent.find("NavbarToggler").simulate("click");
    expect(renderedComponent.state().isOpen).toBe(false);
  });
});
