// @flow

import { List } from "immutable";

import { ApplicationState, State } from "../../models";
import { selectApplication, makeSelectApplications } from "./selectors";

describe("selectApplication", () => {
  it("should select the application state", () => {
    const applicationState = new ApplicationState();
    const mockedState = new State();

    expect(selectApplication(mockedState)).toEqual(applicationState);
  });
});

describe("makeSelectApplications", () => {
  const applicationsSelector = makeSelectApplications();
  it("should select the applications", () => {
    const applications = List();
    const mockedState = new State();

    expect(applicationsSelector(mockedState)).toEqual(applications);
  });
});
