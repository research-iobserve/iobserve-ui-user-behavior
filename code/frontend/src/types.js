// @flow

import { Record as iRecord, List, Map } from "immutable";
import { Application, Page, Visit } from "./models";

interface RecordAPI<T: Object> {
  constructor(init?: $Shape<T>): void,
  get<A>(key: $Keys<T>): A,
  set<A>(key: $Keys<T>, value: A): $Subtype<Record<T>>,
  delete<A>(key: $Keys<T>): $Subtype<Record<T>>,
  setIn<A>(Array<any>, value: A): $Subtype<Record<T>>,
  hasIn(keys: Array<any>): boolean,
  update<A>(key: $Keys<T>, updater: (value: A) => A): $Subtype<Record<T>>,
  updateIn<A>(path: Array<any>, updater: (value: A) => A): $Subtype<Record<T>>,
  deleteIn<A>(path: Array<any>): $Subtype<Record<T>>,
  merge(values: $Shape<T>): $Subtype<Record<T>>,
  withMutations(mutator: (mutable: Record<T>) => any): $Subtype<Record<T>>,
  findIndex(predicate: (value: T) => boolean): $Keys<T>,
  inspect(): string,
  toObject(): T,
  toJS(): Object
}

export default function Record<T: Object>(spec: T): Class<RecordAPI<T>> {
  return iRecord(spec);
}

export type ApplicationT = {
  id: number,
  name: string,
  description: string,
  custom: boolean
};

export type PageT = {
  id: number,
  name: string,
  extra: Map<string, string>
};

export type VisitT = {
  id: number,
  start: Page,
  end: Page,
  count: number,
  action: string
};

export type ApplicationStateT = {
  applications: List<Application>
};

export type PageStateT = {
  pages: Map<number, List<Page>>
};

export type VisitStateT = {
  visits: Map<number, List<Visit>>
};

export type LayoutT = "cose" | "breadthfirst" | "grid";
export type SettingsStateT = {
  layout: LayoutT
};

export type StateT = {
  application: ApplicationStateT,
  page: PageStateT,
  visit: VisitStateT,
  settings: SettingsStateT
};
