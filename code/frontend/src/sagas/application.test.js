// @flow
import { put, call, takeLatest } from "redux-saga/effects";
import { List } from "immutable";

import { loadedApplications } from "../actions/applications";
import { getApplications as apiGetApplications } from "../api/applications";
import { getApplications, getApplicationsWatcher } from "./applications";

describe("sagas", () => {
  describe("getApplications saga", () => {
    const generator = getApplications();

    it("should call getApplications API", () => {
      expect(generator.next().value).toEqual(call(apiGetApplications));
    });

    it("should dispatch the results", () => {
      const applications = List();

      expect(generator.next(applications).value).toEqual(
        put(loadedApplications(applications))
      );
    });

    it("should finish", () => {
      expect(generator.next().done).toBe(true);
    });
  });

  describe("getApplicationsWatcher saga", () => {
    const generator = getApplicationsWatcher();

    it("should call getApplications", () => {
      expect(generator.next().value).toEqual(
        takeLatest("LOAD_APPLICATIONS", getApplications)
      );
    });

    it("should finish", () => {
      expect(generator.next().done).toBe(true);
    });
  });
});
