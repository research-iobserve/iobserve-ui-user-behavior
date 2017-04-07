// @flow

import applicationSagas from "./applications";
import pagesSagas from "./pages";
import visitsSagas from "./visits";
import websocketSagas from "./websocket";

export default applicationSagas.concat(pagesSagas, visitsSagas, websocketSagas);
