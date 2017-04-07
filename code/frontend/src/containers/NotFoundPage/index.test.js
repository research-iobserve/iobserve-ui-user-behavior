// @flow

import React from "react";
import renderer from "react-test-renderer";

import NotFoundPage from "./index";

describe("<NotFoundPage />", () => {
  it("should render", () => {
    const tree = renderer.create(<NotFoundPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
