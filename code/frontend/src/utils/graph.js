// @flow
import { List, Set } from "immutable";

import type { Page, Visit } from "../models";

export function formatPages(pages: List<Page> | Set<Page>): Object {
  return pages
    .map(page => ({
      group: "nodes",
      data: {
        id: `${page.get("id")}`,
        name: `${page.get("name")}`
      }
    }))
    .toJS();
}

export function formatVisits(visits: List<Visit> | Set<Visit>): Object {
  return visits
    .map(visit => ({
      group: "edges",
      data: {
        id: `${visit.get("id")}`,
        target: `${visit.get("end").get("id")}`,
        source: `${visit.get("start").get("id")}`,
        action: `${visit.get("action")}`,
        count: visit.get("count")
      }
    }))
    .toJS();
}
