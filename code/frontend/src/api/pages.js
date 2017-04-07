// @flow

import { List, Map } from "immutable";
import JSOG from "jsog";

import { API_URL } from "./index";
import { Page } from "../models";
import request from "../utils/request";

export function getPages(applicationId: number): Promise<List<Page>> {
  const requestURL = `${API_URL}/applications/${applicationId}/pages`;

  return request(requestURL)
    .then((pages: Array<Object>) => JSOG.decode(pages))
    .then((pages: Array<Object>) =>
      List(pages.map(page => new Page(page).set("extra", Map(page.extra)))));
}

export function addPage(applicationId: number, page: Page): Promise<Page> {
  const requestURL = `${API_URL}/applications/${applicationId}/pages`;

  return request(requestURL, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(page.toJS())
  })
    .then((page: Object) => JSOG.decode(page))
    .then((page: Object) => new Page(page));
}
