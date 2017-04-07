// @flow

import React from "react";
import renderer from "react-test-renderer";

import { Application } from "../../models";
import ApplicationListItem from "./index";

const application = new Application({
  id: 0,
  name: "TestApplication",
  description: "Test ..."
});

describe("<ApplicationListItem />", () => {
  it("should render a application", () => {
    const tree = renderer
      .create(
        <ApplicationListItem application={application} isEditor={false} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
