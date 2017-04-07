// @flow

import { createSelector } from "reselect";

import { State } from "../../models";

const selectApplication = (state: State) => state.get("application");

const makeSelectApplications = () =>
  createSelector(selectApplication, applicationState =>
    applicationState
      .get("applications")
      .filter(application => application.get("custom", false)));

export { selectApplication, makeSelectApplications };
