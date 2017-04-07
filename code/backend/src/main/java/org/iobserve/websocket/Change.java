package org.iobserve.websocket;

public class Change<T> {

    private String type;
    private T object;

    public Change() {

    }

    public Change(final String type, final T object) {
        super();
        this.type = type;
        this.object = object;
    }

    public String getType() {
        return this.type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public T getObject() {
        return this.object;
    }

    public void setObject(final T object) {
        this.object = object;
    }

}
