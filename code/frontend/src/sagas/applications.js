// @flow
import { put, call, takeLatest } from "redux-saga/effects";
import type { PutEffect, ForkEffect, CallEffect } from "redux-saga/effects";
import { browserHistory } from "react-router";

import type { Action, addApplicationRequestAction } from "../actions/types";
import { loadedApplications, addApplication } from "../actions/applications";
import {
  getApplications as apiGetApplications,
  addApplication as apiAddApplication
} from "../api/applications";

export function* getApplications(): Generator<
  | PutEffect<Action>
  | CallEffect, *, *> {
  try {
    const applications = yield call(apiGetApplications);
    yield put(loadedApplications(applications));
  } catch (err) {
    // TODO: Handle error
    console.error(err);
  }
}

export function* addApplicationRequest(
  action: addApplicationRequestAction
): Generator<PutEffect<Action> | CallEffect, *, *> {
  try {
    const application = yield call(apiAddApplication, action.application);
    yield put(addApplication(application));
    yield call(browserHistory.push, `/editor/${application.get("id")}`);
  } catch (err) {
    // TODO: Handle error
    console.error(err);
  }
}

export function* getApplicationsWatcher(): Generator<ForkEffect, void, void> {
  yield takeLatest("LOAD_APPLICATIONS", getApplications);
}

export function* addApplicationRequestWatcher(): Generator<ForkEffect, void, void> {
  yield takeLatest("ADD_APPLICATION_REQUEST", addApplicationRequest);
}

export default [getApplicationsWatcher, addApplicationRequestWatcher];
