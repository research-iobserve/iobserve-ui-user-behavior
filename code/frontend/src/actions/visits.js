// @flow

import { List } from "immutable";

import type { Action } from "./types";
import type { Visit } from "../models";

export function loadVisits(applicationId: number): Action {
  return {
    type: "LOAD_VISITS",
    id: applicationId
  };
}

export function loadedVisits(
  applicationId: number,
  visits: List<Visit>
): Action {
  return {
    type: "LOADED_VISITS",
    list: visits,
    id: applicationId
  };
}

export function addVisit(applicationId: number, visit: Visit): Action {
  return {
    type: "ADD_VISIT",
    visit,
    applicationId
  };
}

export function addVisitRequest(applicationId: number, visit: Visit): Action {
  return {
    type: "ADD_VISIT_REQUEST",
    visit,
    applicationId
  };
}

export function deleteVisit(applicationId: number, id: number): Action {
  return {
    type: "DELETE_VISIT",
    id: applicationId,
    visitId: id
  };
}
