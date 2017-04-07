// @flow

/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { List } from "immutable";
import { combineReducers } from "redux-immutable";

import {
  ApplicationState,
  PageState,
  VisitState,
  SettingsState
} from "./models";
import type { Action } from "./actions/types";

/*
 * applicationReducer
 *
 * The reducer stores our applications.
 */
export function applicationReducer(
  state: ApplicationState = new ApplicationState(),
  action: Action
): ApplicationState {
  switch (action.type) {
    case "LOADED_APPLICATIONS":
      return state.set("applications", action.list);
    case "ADD_APPLICATION":
      return state.update("applications", applications =>
      // $FlowFixMe: Bug in flow
        applications.push(action.application));
    default:
      return state;
  }
}

/*
 * pageReducer
 *
 * The reducer stores our pages.
 */
export function pageReducer(
  state: PageState = new PageState(),
  action: Action
): PageState {
  switch (action.type) {
    case "LOADED_PAGES":
      return state.setIn(["pages", action.id], action.list);
    case "ADD_PAGE":
      return state.updateIn(["pages", action.applicationId], list => {
        if (!list) {
          list = List();
        }
        const index = list.findIndex(
          // $FlowFixMe: Bug in flow
          item => item.get("id") === action.page.get("id")
        );
        if (index === -1) {
          // $FlowFixMe: Bug in flow
          list = list.push(action.page);
        }
        return list;
      });
    case "DELETE_PAGE":
      return state.deleteIn([
        "pages",
        action.id,
        state.get("pages").get(action.id).findIndex(
          // $FlowFixMe: Bug in flow
          item => item.get("id") === action.pageId
        )
      ]);
    case "ADD_APPLICATION":
      return state.setIn(["pages", action.application.get("id")], List());
    default:
      return state;
  }
}

/*
 * visitReducer
 *
 * The reducer stores our visits.
 */
export function visitReducer(
  state: VisitState = new VisitState(),
  action: Action
): VisitState {
  switch (action.type) {
    case "LOADED_VISITS":
      return state.setIn(["visits", action.id], action.list);
    case "ADD_VISIT":
      return state.updateIn(["visits", action.applicationId], list => {
        if (!list) {
          list = List();
        }
        const index = list.findIndex(
          // $FlowFixMe: Bug in flow
          item => item.get("id") === action.visit.get("id")
        );
        if (index === -1) {
          // $FlowFixMe: Bug in flow
          list = list.push(action.visit);
        }
        return list;
      });
    case "DELETE_VISIT":
      return state.deleteIn([
        "visits",
        action.id,
        state.get("visits").get(action.id).findIndex(
          // $FlowFixMe: Bug in flow
          item => item.get("id") === action.visitId
        )
      ]);
    case "ADD_APPLICATION":
      return state.setIn(["visits", action.application.get("id")], List());
    default:
      return state;
  }
}

/*
 * settingsReducer
 *
 * The reducer stores our settings.
 */
export function settingsReducer(
  state: SettingsState = new SettingsState(),
  action: Action
): SettingsState {
  switch (action.type) {
    case "CHANGE_LAYOUT":
      return state.set("layout", action.layout);
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(): Function {
  return combineReducers({
    application: applicationReducer,
    page: pageReducer,
    visit: visitReducer,
    settings: settingsReducer
  });
}
