// @flow

import { State } from "./models";
import configureStore from "./store";

describe("configureStore", () => {
  it("should create the store with the given state", () => {
    const state = new State();
    const store = configureStore(state);

    expect(store.getState()).toEqual(state);
  });
});
