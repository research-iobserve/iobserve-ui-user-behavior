// @flow

import { List } from "immutable";

import type { Action } from "../actions/types";
import { loadVisits, loadedVisits, addVisit, deleteVisit } from "./visits";
import { Visit } from "../models";

describe("Visit Actions", () => {
  const applicationId = 1;

  it("should create the LOAD_VISITS action", () => {
    const expectedResult: Action = {
      type: "LOAD_VISITS",
      id: applicationId
    };

    expect(loadVisits(applicationId)).toEqual(expectedResult);
  });

  it("should create the LOADED_VISITS action", () => {
    const expectedResult: Action = {
      type: "LOADED_VISITS",
      list: List(),
      id: applicationId
    };

    expect(loadedVisits(applicationId, List())).toEqual(expectedResult);
  });

  it("should create the ADD_VISIT action", () => {
    const visit = new Visit();
    const expectedResult: Action = {
      type: "ADD_VISIT",
      visit,
      applicationId
    };

    expect(addVisit(applicationId, visit)).toEqual(expectedResult);
  });

  it("should create the DELETE_VISIT action", () => {
    const visitId = 2;
    const expectedResult: Action = {
      type: "DELETE_VISIT",
      id: applicationId,
      visitId
    };

    expect(deleteVisit(applicationId, visitId)).toEqual(expectedResult);
  });
});
