// @flow
import {
  put,
  call,
  takeLatest,
  take,
  cancel,
  cancelled
} from "redux-saga/effects";
import { eventChannel, buffers, END } from "redux-saga";
import { Map } from "immutable";
import JSOG from "jsog";

import { WS_URL } from "../api/index";
import type { subscribeAction } from "../actions/types";
import { Page, Visit } from "../models";
import { addPage, deletePage } from "../actions/pages";
import { addVisit, deleteVisit } from "../actions/visits";

function createSocketChannel(applicationId: number) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(
    emit => {
      const socket = new WebSocket(`${WS_URL}/${applicationId}`);

      socket.onclose = () => {
        console.log("close");
        emit(END);
      };

      socket.onmessage = event => {
        console.info("Websocket Event", event);

        if (typeof event.data === "string") {
          const data = JSON.parse(event.data);
          emit(data);
        }
      };

      const unsubscribe = () => {
        socket.close();
      };

      return unsubscribe;
    },
    buffers.expanding(10)
  );
}

export function* openWebsocket(action: subscribeAction): any {
  const socketChannel = yield call(createSocketChannel, action.id);

  try {
    while (true) {
      const payload = yield take(socketChannel);
      const data = JSOG.decode(payload.object);

      switch (payload.type) {
        case "ADD_PAGE":
          yield put(
            addPage(action.id, new Page(data).set("extra", Map(data.extra)))
          );
          break;
        case "DELETE_PAGE":
          yield put(deletePage(action.id, data.id));
          break;
        case "ADD_VISIT":
          yield put(
            addVisit(
              action.id,
              new Visit(data)
                .set("start", new Page(data.start))
                .set("end", new Page(data.end))
            )
          );
          break;
        case "DELETE_VISIT":
          yield put(deleteVisit(action.id, data.id));
          break;
        default:
          console.warn("Unhandled websocket message");
      }
    }
  } finally {
    if (yield cancelled()) {
      socketChannel.close();
    }
  }
}

export function* openWebsocketWatcher(): any {
  while (true) {
    const watcher = yield takeLatest("SUBSCRIBE", openWebsocket);

    yield take("UNSUBSCRIBE");
    yield cancel(watcher);
  }
}

export default [openWebsocketWatcher];
