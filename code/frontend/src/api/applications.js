// @flow

import { List } from "immutable";
import JSOG from "jsog";

import { API_URL } from "./index";
import { Application } from "../models";
import request from "../utils/request";

export function getApplications(): Promise<List<Application>> {
  const requestURL = `${API_URL}/applications`;

  return request(requestURL)
    .then((applications: Array<Object>) => JSOG.decode(applications))
    .then((applications: Array<Object>) =>
      List(applications.map(application => new Application(application))));
}

export function addApplication(application: Application): Promise<Application> {
  const requestURL = `${API_URL}/applications`;

  return request(requestURL, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(application.toJS())
  })
    .then((application: Object) => JSOG.decode(application))
    .then((application: Object) => new Application(application));
}
