// @flow

import { List, Map } from "immutable";

import {
  ApplicationState,
  PageState,
  VisitState,
  Application,
  Page,
  Visit
} from "./models";
import { applicationReducer, pageReducer, visitReducer } from "./reducers";

describe("applicationReducer", () => {
  let emptyState;
  const applicationId = 2;

  beforeEach(() => {
    emptyState = new ApplicationState();
  });

  it("should return the initial state", () => {
    const expectedResult = emptyState;

    expect(
      applicationReducer(undefined, {
        type: "LOADED_APPLICATIONS",
        list: List()
      })
    ).toEqual(expectedResult);
  });

  it("should add a new application", () => {
    const state = emptyState.set(
      "applications",
      List([new Application({ id: 1, name: "Test 1" })])
    );
    const expectedResult = emptyState.set(
      "applications",
      List([
        new Application({ id: 1, name: "Test 1" }),
        new Application({ id: applicationId, name: "New Application" })
      ])
    );

    expect(
      applicationReducer(state, {
        type: "ADD_APPLICATION",
        application: new Application({
          id: applicationId,
          name: "New Application"
        })
      })
    ).toEqual(expectedResult);
  });
});

describe("pageReducer", () => {
  let emptyState;
  const applicationId = 1;

  beforeEach(() => {
    emptyState = new PageState();
  });

  it("should ignore unknown actions and return the initial state", () => {
    const expectedResult = emptyState;

    expect(
      pageReducer(undefined, { type: "LOADED_APPLICATIONS", list: List() })
    ).toEqual(expectedResult);
  });

  it("it should save loaded pages under the corresponding application id", () => {
    const pages = List([
      new Page({ id: 1, name: "Test 1" }),
      new Page({ id: 2, name: "Test 2" })
    ]);
    const expectedResult = emptyState.setIn(["pages", applicationId], pages);

    expect(
      pageReducer(undefined, {
        type: "LOADED_PAGES",
        id: applicationId,
        list: pages
      })
    ).toEqual(expectedResult);
  });

  it("it should add a new page under the corresponding application id", () => {
    const page = new Page({ id: 3, name: "Test 3" });
    const state = emptyState.setIn(
      ["pages", applicationId],
      List([
        new Page({ id: 1, name: "Test 1" }),
        new Page({ id: 2, name: "Test 2" })
      ])
    );
    const expectedResult = emptyState.setIn(
      ["pages", applicationId],
      List([
        new Page({ id: 1, name: "Test 1" }),
        new Page({ id: 2, name: "Test 2" }),
        new Page({ id: 3, name: "Test 3" })
      ])
    );

    expect(
      pageReducer(state, { type: "ADD_PAGE", applicationId, page })
    ).toEqual(expectedResult);
  });

  it("it should delete a page under the corresponding application id", () => {
    const pageId = 2;
    const state = emptyState.setIn(
      ["pages", applicationId],
      List([
        new Page({ id: 1, name: "Test 1" }),
        new Page({ id: 2, name: "Test 2" })
      ])
    );
    const expectedResult = emptyState.setIn(
      ["pages", applicationId],
      List([new Page({ id: 1, name: "Test 1" })])
    );

    expect(
      pageReducer(state, { type: "DELETE_PAGE", id: applicationId, pageId })
    ).toEqual(expectedResult);
  });

  it("should add a new application with no pages", () => {
    const expectedResult = emptyState.setIn(["pages", applicationId], List());

    expect(
      pageReducer(undefined, {
        type: "ADD_APPLICATION",
        application: new Application({
          id: applicationId,
          name: "New Application"
        })
      })
    ).toEqual(expectedResult);
  });
});

describe("visitReducer", () => {
  let emptyState;
  const applicationId = 1;

  beforeEach(() => {
    emptyState = new VisitState();
  });

  it("should ignore unknown actions and return the initial state", () => {
    const expectedResult = emptyState;

    expect(
      visitReducer(undefined, { type: "LOADED_APPLICATIONS", list: List() })
    ).toEqual(expectedResult);
  });

  it("it should save loaded visits under the corresponding application id", () => {
    const visits = List([
      new Visit({
        id: 1,
        start: new Page(),
        end: new Page(),
        count: 100,
        action: "view"
      }),
      new Visit({
        id: 2,
        start: new Page(),
        end: new Page(),
        count: 200,
        action: "view"
      })
    ]);
    const expectedResult = emptyState.setIn(["visits", applicationId], visits);

    expect(
      visitReducer(undefined, {
        type: "LOADED_VISITS",
        id: applicationId,
        list: visits
      })
    ).toEqual(expectedResult);
  });

  it("it should add a new visit under the corresponding application id", () => {
    const visit = new Visit({
      id: 3,
      start: new Page(),
      end: new Page(),
      count: 300,
      action: "view"
    });
    const state = emptyState.setIn(
      ["visits", applicationId],
      List([
        new Visit({
          id: 1,
          start: new Page(),
          end: new Page(),
          count: 100,
          action: "view"
        }),
        new Visit({
          id: 2,
          start: new Page(),
          end: new Page(),
          count: 200,
          action: "view"
        })
      ])
    );
    const expectedResult = emptyState.setIn(
      ["visits", applicationId],
      List([
        new Visit({
          id: 1,
          start: new Page(),
          end: new Page(),
          count: 100,
          action: "view"
        }),
        new Visit({
          id: 2,
          start: new Page(),
          end: new Page(),
          count: 200,
          action: "view"
        }),
        new Visit({
          id: 3,
          start: new Page(),
          end: new Page(),
          count: 300,
          action: "view"
        })
      ])
    );

    expect(
      visitReducer(state, { type: "ADD_VISIT", applicationId, visit })
    ).toEqual(expectedResult);
  });

  it("it should delete a visit under the corresponding application id", () => {
    const visitId = 2;
    const state = emptyState.setIn(
      ["visits", applicationId],
      List([
        new Visit({
          id: 1,
          start: new Page(),
          end: new Page(),
          count: 100,
          action: "view"
        }),
        new Visit({
          id: 2,
          start: new Page(),
          end: new Page(),
          count: 200,
          action: "view"
        })
      ])
    );
    const expectedResult = emptyState.setIn(
      ["visits", applicationId],
      List([
        new Visit({
          id: 1,
          start: new Page(),
          end: new Page(),
          count: 100,
          action: "view"
        })
      ])
    );

    expect(
      visitReducer(state, { type: "DELETE_VISIT", id: applicationId, visitId })
    ).toEqual(expectedResult);
  });

  it("should add a new application with no visits", () => {
    const expectedResult = emptyState.setIn(["visits", applicationId], List());

    expect(
      visitReducer(undefined, {
        type: "ADD_APPLICATION",
        application: new Application({
          id: applicationId,
          name: "New Application"
        })
      })
    ).toEqual(expectedResult);
  });
});
