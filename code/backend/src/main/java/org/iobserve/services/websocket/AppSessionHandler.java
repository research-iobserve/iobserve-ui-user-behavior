package org.iobserve.services.websocket;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.Session;

import org.iobserve.websocket.Change;

public class AppSessionHandler {

    private final Long appId;
    private final Set<Session> sessions = new HashSet<>();

    public AppSessionHandler(final Long appId) {
        this.appId = appId;
    }

    public synchronized void subscribe(final Session session) {
        this.sessions.add(session);
    }

    public synchronized void broadcastChange(final Change<?> change) {
        this.sessions.forEach((session) -> {
            session.getAsyncRemote().sendObject(change);
        });
    }

    public Long getAppId() {
        return this.appId;
    }

    public synchronized void unsubscribe(final Session session) {
        if (session.isOpen()) {
            try {
                session.close();
            } catch (final IOException e) {
                e.printStackTrace();
            }
        }
        final boolean didRemove = this.sessions.remove(session);
        if (!didRemove) {
            System.out.println("could not remove session " + session);
        }
    }
}
