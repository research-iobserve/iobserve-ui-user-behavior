// @flow

import { List } from "immutable";
import JSOG from "jsog";

import { API_URL } from "./index";
import { Page, Visit } from "../models";
import request from "../utils/request";

export function getVisits(applicationId: number): Promise<List<Visit>> {
  const requestURL = `${API_URL}/applications/${applicationId}/visits`;

  return request(requestURL)
    .then((visits: Array<Object>) => JSOG.decode(visits))
    .then((visits: Array<Object>) =>
      List(
        visits.map(visit =>
          new Visit(visit)
            .set("start", new Page(visit.start))
            .set("end", new Page(visit.end)))
      ));
}

export function addVisit(applicationId: number, visit: Visit): Promise<Visit> {
  const requestURL = `${API_URL}/applications/${applicationId}/visits`;

  return request(requestURL, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(visit.toJS())
  })
    .then((visit: Object) => JSOG.decode(visit))
    .then((visit: Object) =>
      new Visit(visit)
        .set("start", new Page(visit.start))
        .set("end", new Page(visit.end)));
}
