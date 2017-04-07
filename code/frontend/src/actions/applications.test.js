// @flow

import { List } from "immutable";

import type { Action } from "../actions/types";
import {
  loadApplications,
  loadedApplications,
  subscribe,
  unsubscribe
} from "./applications";

describe("Application Actions", () => {
  it("should create the LOAD_APPLICATIONS action", () => {
    const expectedResult: Action = { type: "LOAD_APPLICATIONS" };

    expect(loadApplications()).toEqual(expectedResult);
  });

  it("should create the LOADED_APPLICATIONS action", () => {
    const expectedResult: Action = {
      type: "LOADED_APPLICATIONS",
      list: List()
    };

    expect(loadedApplications(List())).toEqual(expectedResult);
  });

  it("should create the SUBSCRIBE action", () => {
    const expectedResult: Action = {
      type: "SUBSCRIBE",
      id: 1
    };

    expect(subscribe(1)).toEqual(expectedResult);
  });

  it("should create the UNSUBSCRIBE action", () => {
    const expectedResult: Action = {
      type: "UNSUBSCRIBE"
    };

    expect(unsubscribe()).toEqual(expectedResult);
  });
});
