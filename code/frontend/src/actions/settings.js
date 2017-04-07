// @flow

import type { LayoutT } from "../types";
import type { Action } from "./types";

export function changeLayout(layout: LayoutT): Action {
  return {
    type: "CHANGE_LAYOUT",
    layout
  };
}
