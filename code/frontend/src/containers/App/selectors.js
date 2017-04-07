// @flow

import { createSelector } from "reselect";

import { State } from "../../models";

const selectSettings = (state: State) => state.get("settings");

const makeSelectSettings = () =>
  createSelector(selectSettings, settingsState => settingsState);

export { selectSettings, makeSelectSettings };
