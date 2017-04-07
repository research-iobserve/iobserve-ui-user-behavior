// @flow

import { List } from "immutable";

import type { Action } from "./types";
import type { Application } from "../models";

export function loadApplications(): Action {
  return {
    type: "LOAD_APPLICATIONS"
  };
}

export function loadedApplications(applications: List<Application>): Action {
  return {
    type: "LOADED_APPLICATIONS",
    list: applications
  };
}

export function subscribe(id: number): Action {
  return {
    type: "SUBSCRIBE",
    id
  };
}

export function unsubscribe(): Action {
  return {
    type: "UNSUBSCRIBE"
  };
}

export function addApplication(application: Application): Action {
  return {
    type: "ADD_APPLICATION",
    application
  };
}

export function addApplicationRequest(application: Application): Action {
  return {
    type: "ADD_APPLICATION_REQUEST",
    application
  };
}
