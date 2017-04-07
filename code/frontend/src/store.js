// @flow

/**
* Create the store
*/

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import createReducer from "./reducers";
import { State } from "./models";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState: State) {
  // Create the store with one middleware
  // 1. sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers = process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  sagas.map(sagaMiddleware.run);

  return store;
}
