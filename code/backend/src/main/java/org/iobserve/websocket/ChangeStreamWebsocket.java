package org.iobserve.websocket;

import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.iobserve.services.websocket.ChangeStreamService;

@ServerEndpoint(value = "/v1/changestream/{appId}", encoders = { ChangeCoder.class })
public class ChangeStreamWebsocket {

    private static final ChangeStreamService streamService = ChangeStreamService.INSTANCE;

    @OnOpen
    public void onOpen(@PathParam("appId") final Long appId, final Session session) {
        ChangeStreamWebsocket.streamService.subscribe(appId, session);
    }

    @OnClose
    public void onClose(@PathParam("appId") final Long appId, final Session session) {
        ChangeStreamWebsocket.streamService.unsubscribe(appId, session);
    }

}
