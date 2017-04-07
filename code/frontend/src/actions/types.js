// @flow

import { List } from "immutable";

import type { LayoutT } from "../types";
import type { Application, Page, Visit } from "../models";

export type loadApplicationsAction = { type: "LOAD_APPLICATIONS" };
export type loadPagesAction = { type: "LOAD_PAGES", id: number };
export type loadVisitsAction = { type: "LOAD_VISITS", id: number };
export type loadedApplicationsAction = {
  type: "LOADED_APPLICATIONS",
  list: List<Application>
};
export type loadedPagesAction = {
  type: "LOADED_PAGES",
  list: List<Page>,
  id: number
};
export type loadedVisitsAction = {
  type: "LOADED_VISITS",
  list: List<Visit>,
  id: number
};
export type subscribeAction = { type: "SUBSCRIBE", id: number };
export type unsubscribeAction = { type: "UNSUBSCRIBE" };
export type addPageAction = {
  type: "ADD_PAGE",
  applicationId: number,
  page: Page
};
export type addVisitAction = {
  type: "ADD_VISIT",
  applicationId: number,
  visit: Visit
};
export type deletePageAction = {
  type: "DELETE_PAGE",
  id: number,
  pageId: number
};
export type deleteVisitAction = {
  type: "DELETE_VISIT",
  id: number,
  visitId: number
};
export type addApplicationRequestAction = {
  type: "ADD_APPLICATION_REQUEST",
  application: Application
};
export type addApplicationAction = {
  type: "ADD_APPLICATION",
  application: Application
};
export type changeLayoutAction = { type: "CHANGE_LAYOUT", layout: LayoutT };
export type addPageRequestAction = {
  type: "ADD_PAGE_REQUEST",
  page: Page,
  applicationId: number
};
export type addVisitRequestAction = {
  type: "ADD_VISIT_REQUEST",
  visit: Visit,
  applicationId: number
};

export type Action =
  | loadApplicationsAction
  | loadPagesAction
  | loadVisitsAction
  | loadedApplicationsAction
  | loadedPagesAction
  | loadedVisitsAction
  | subscribeAction
  | unsubscribeAction
  | addPageAction
  | addVisitAction
  | deletePageAction
  | deleteVisitAction
  | addApplicationRequestAction
  | addApplicationAction
  | changeLayoutAction
  | addPageRequestAction
  | addVisitRequestAction;
