// @flow

import { List, Map } from "immutable";
import Record from "./types";
import type {
  ApplicationT,
  ApplicationStateT,
  PageT,
  PageStateT,
  VisitT,
  VisitStateT,
  SettingsStateT,
  LayoutT,
  StateT
} from "./types";

/**
 * Application
 */
const applicationDefaults: ApplicationT = {
  id: 0,
  name: "",
  description: "",
  custom: false
};
export class Application extends Record(applicationDefaults) {
  id: number;
  name: string;
  description: string;
  custom: boolean;
}

/**
 * Page
 */
const pageDefaults: PageT = {
  id: 0,
  name: "",
  extra: Map()
};
export class Page extends Record(pageDefaults) {
  id: number;
  name: string;
  extra: Map<string, string>;
}

/**
 * Visit
 */
const visitDefaults: VisitT = {
  id: 0,
  count: 0,
  start: new Page(),
  end: new Page(),
  action: ""
};
export class Visit extends Record(visitDefaults) {
  id: number;
  count: number;
  start: Page;
  end: Page;
  action: string;
}

/**
 * ApplicationState
 */
const applicationStateDefaults: ApplicationStateT = {
  applications: List()
};
export class ApplicationState extends Record(applicationStateDefaults) {
  applications: List<Application>;
}

/**
 * PageState
 */
const pageStateDefaults: PageStateT = {
  pages: Map()
};
export class PageState extends Record(pageStateDefaults) {
  pages: Map<number, List<Page>>;
}

/**
 * VisitState
 */
const visitStateDefaults: VisitStateT = {
  visits: Map()
};
export class VisitState extends Record(visitStateDefaults) {
  visits: Map<number, List<Visit>>;
}

/**
 * SettingsState
 */
const settingsStateDefaults: SettingsStateT = {
  layout: "breadthfirst"
};
export class SettingsState extends Record(settingsStateDefaults) {
  layout: LayoutT;
}

/**
 * State
 */
const stateDefaults: StateT = {
  application: new ApplicationState(),
  page: new PageState(),
  visit: new VisitState(),
  settings: new SettingsState()
};
export class State extends Record(stateDefaults) {
  application: ApplicationState;
  page: PageState;
  visit: VisitState;
  settings: SettingsState;
}
