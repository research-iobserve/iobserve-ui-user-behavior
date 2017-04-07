// @flow

import { createSelector } from "reselect";
import { List, Map } from "immutable";

import type { Props } from "./index";
import { State, Application, Page, Visit } from "../../models";

const selectApplications = (state: State) =>
  state.get("application").get("applications");
const selectPages = (state: State) => state.get("page").get("pages");
const selectVisits = (state: State) => state.get("visit").get("visits");
const selectSettings = (state: State) => state.get("settings");

const selectApplicationId = (state: State, props: Props) =>
  parseInt(props.params.id, 10);

const makeSelectApplication = () => {
  return createSelector(
    [selectApplications, selectApplicationId],
    (applications: List<Application>, id: number) => {
      return applications.get(applications.findIndex(item => item.id === id));
    }
  );
};

const makeSelectPages = () => {
  return createSelector(
    [selectPages, selectApplicationId],
    (pages: Map<number, List<Page>>, id: number) => {
      return pages.get(id, List());
    }
  );
};

const makeSelectVisits = () => {
  return createSelector(
    [selectVisits, selectApplicationId],
    (visits: Map<number, List<Visit>>, id: number) => {
      return visits.get(id, List());
    }
  );
};

const makeSelectLayout = () =>
  createSelector(selectSettings, settingsState => settingsState.get("layout"));

export {
  selectApplications,
  selectApplicationId,
  makeSelectApplication,
  makeSelectPages,
  makeSelectVisits,
  makeSelectLayout
};
