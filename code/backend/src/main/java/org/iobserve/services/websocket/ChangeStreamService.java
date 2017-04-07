package org.iobserve.services.websocket;

import java.util.concurrent.ConcurrentHashMap;

import javax.validation.constraints.NotNull;
import javax.websocket.Session;

import org.iobserve.websocket.Change;

public class ChangeStreamService {

    public static ChangeStreamService INSTANCE = new ChangeStreamService();

    private final ConcurrentHashMap<Long, AppSessionHandler> sessionsByApp = new ConcurrentHashMap<>();

    public void subscribe(@NotNull final Long appId, final Session websocketSession) {
        synchronized (this.sessionsByApp) {
            AppSessionHandler handler;
            handler = this.sessionsByApp.get(appId);
            if (handler == null) {
                handler = new AppSessionHandler(appId);
                this.sessionsByApp.put(appId, handler);
            }
            handler.subscribe(websocketSession);
        }
    }

    public void unsubscribe(final Long appId, final Session session) {
        final AppSessionHandler appSessionHandler = this.sessionsByApp.get(appId);
        if (appSessionHandler != null) {
            this.sessionsByApp.get(appId).unsubscribe(session);
        }
    }

    public void broadcastChange(final Long appId, final Change<?> change) {
        final AppSessionHandler appSessionHandler = this.sessionsByApp.get(appId);
        if (appSessionHandler != null) {
            appSessionHandler.broadcastChange(change);
        }
    }

}
