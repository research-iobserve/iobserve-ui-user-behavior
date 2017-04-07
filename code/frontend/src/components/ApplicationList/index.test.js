// @flow

import React from "react";
import renderer from "react-test-renderer";
import { List } from "immutable";

import { Application } from "../../models";
import ApplicationList from "./index";

describe("<ApplicationList />", () => {
  it("should render", () => {
    const tree = renderer
      .create(<ApplicationList applications={List()} isEditor={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  const applications: List<Application> = List([
    new Application({ id: 0, name: "amazon.de", description: "..." }),
    new Application({ id: 1, name: "facebook.com", description: "..." }),
    new Application({ id: 2, name: "heise.de", description: "..." })
  ]);

  it("should render a list", () => {
    const tree = renderer
      .create(<ApplicationList applications={applications} isEditor={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
