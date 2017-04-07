// @flow
import { put, call, takeLatest } from "redux-saga/effects";
import type { PutEffect, ForkEffect, CallEffect } from "redux-saga/effects";

import type {
  Action,
  loadPagesAction,
  addPageRequestAction
} from "../actions/types";
import { loadedPages, addPage } from "../actions/pages";
import { getPages as apiGetPages, addPage as apiAddPage } from "../api/pages";

export function* getPages(
  action: loadPagesAction
): Generator<PutEffect<Action> | CallEffect, void, *> {
  try {
    const pages = yield call(apiGetPages, action.id);
    yield put(loadedPages(action.id, pages));
  } catch (err) {
    // TODO: Handle error
    console.error(err);
  }
}

export function* addPageRequest(
  action: addPageRequestAction
): Generator<PutEffect<Action> | CallEffect, *, *> {
  try {
    const page = yield call(apiAddPage, action.applicationId, action.page);
    yield put(addPage(action.applicationId, page));
  } catch (err) {
    // TODO: Handle error
    console.error(err);
  }
}

export function* getPagesWatcher(): Generator<ForkEffect, void, void> {
  yield takeLatest("LOAD_PAGES", getPages);
}

export function* addPageRequestWatcher(): Generator<ForkEffect, void, void> {
  yield takeLatest("ADD_PAGE_REQUEST", addPageRequest);
}

export default [getPagesWatcher, addPageRequestWatcher];
