// @flow

import { List } from "immutable";

import type { Action } from "../actions/types";
import { loadPages, loadedPages, addPage, deletePage } from "./pages";
import { Page } from "../models";

describe("Page Actions", () => {
  const applicationId = 1;

  it("should create the LOAD_PAGES action", () => {
    const expectedResult: Action = {
      type: "LOAD_PAGES",
      id: applicationId
    };

    expect(loadPages(applicationId)).toEqual(expectedResult);
  });

  it("should create the LOADED_PAGES action", () => {
    const expectedResult: Action = {
      type: "LOADED_PAGES",
      list: List(),
      id: applicationId
    };

    expect(loadedPages(applicationId, List())).toEqual(expectedResult);
  });

  it("should create the ADD_PAGE action", () => {
    const page = new Page();
    const expectedResult: Action = {
      type: "ADD_PAGE",
      page,
      applicationId
    };

    expect(addPage(applicationId, page)).toEqual(expectedResult);
  });

  it("should create the DELETE_PAGE action", () => {
    const pageId = 2;
    const expectedResult: Action = {
      type: "DELETE_PAGE",
      id: applicationId,
      pageId
    };

    expect(deletePage(applicationId, pageId)).toEqual(expectedResult);
  });
});
