// @flow

import { List } from "immutable";

import type { Action } from "./types";
import type { Page } from "../models";

export function loadPages(applicationId: number): Action {
  return {
    type: "LOAD_PAGES",
    id: applicationId
  };
}

export function loadedPages(applicationId: number, pages: List<Page>): Action {
  return {
    type: "LOADED_PAGES",
    list: pages,
    id: applicationId
  };
}

export function addPageRequest(applicationId: number, page: Page): Action {
  return {
    type: "ADD_PAGE_REQUEST",
    page,
    applicationId
  };
}

export function addPage(applicationId: number, page: Page): Action {
  return {
    type: "ADD_PAGE",
    page,
    applicationId
  };
}

export function deletePage(applicationId: number, id: number): Action {
  return {
    type: "DELETE_PAGE",
    id: applicationId,
    pageId: id
  };
}
