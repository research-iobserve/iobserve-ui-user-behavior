// @flow

import React from "react";
import { shallow } from "enzyme";
import { List } from "immutable";

import { Dashboard } from "./index";
import { Application } from "../../models";

describe("<Dashboard />", () => {
  it("should render the intro", () => {
    const renderedComponent = shallow(
      <Dashboard applications={List()} loadApplications={() => {}} />
    );

    expect(renderedComponent.find("Intro").length).toBe(1);
  });

  it("should render the loading indicator without applications", () => {
    const renderedComponent = shallow(
      <Dashboard applications={List()} loadApplications={() => {}} />
    );

    expect(renderedComponent.find("Loading").length).toBe(1);
  });

  it("should render the applicationlist when applications are present", () => {
    const applications = List([new Application()]);
    const renderedComponent = shallow(
      <Dashboard applications={applications} loadApplications={() => {}} />
    );

    expect(renderedComponent.find("ApplicationList").length).toBe(1);
  });

  it("should call loadApplications after mount", () => {
    const loadApplications = jest.fn();
    const renderedComponent = shallow(
      <Dashboard applications={List()} loadApplications={loadApplications} />
    );

    renderedComponent.instance().componentDidMount();

    expect(loadApplications).toBeCalled();
  });
});
