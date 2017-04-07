// @flow

import React from "react";
import renderer from "react-test-renderer";

import Intro from "./index";

describe("<Intro />", () => {
  it("should render", () => {
    const tree = renderer.create(<Intro />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
