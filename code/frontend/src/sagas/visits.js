// @flow
import { put, call, takeLatest } from "redux-saga/effects";
import type { PutEffect, ForkEffect, CallEffect } from "redux-saga/effects";

import type {
  Action,
  loadVisitsAction,
  addVisitRequestAction
} from "../actions/types";
import { loadedVisits, addVisit } from "../actions/visits";
import {
  getVisits as apiGetVisits,
  addVisit as apiAddVisit
} from "../api/visits";

export function* getVisits(
  action: loadVisitsAction
): Generator<PutEffect<Action> | CallEffect, void, *> {
  try {
    const visits = yield call(apiGetVisits, action.id);
    yield put(loadedVisits(action.id, visits));
  } catch (err) {
    // TODO: Handle error
    console.error(err);
  }
}

export function* addVisitRequest(
  action: addVisitRequestAction
): Generator<PutEffect<Action> | CallEffect, *, *> {
  try {
    const visit = yield call(apiAddVisit, action.applicationId, action.visit);
    yield put(addVisit(action.applicationId, visit));
  } catch (err) {
    // TODO: Handle error
    console.error(err);
  }
}

export function* getVisitsWatcher(): Generator<ForkEffect, void, void> {
  yield takeLatest("LOAD_VISITS", getVisits);
}

export function* addVisitRequestWatcher(): Generator<ForkEffect, void, void> {
  yield takeLatest("ADD_VISIT_REQUEST", addVisitRequest);
}

export default [getVisitsWatcher, addVisitRequestWatcher];
