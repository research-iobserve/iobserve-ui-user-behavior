package org.iobserve.websocket;

import java.io.IOException;
import java.io.Writer;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import com.fasterxml.jackson.databind.ObjectMapper;

@SuppressWarnings("rawtypes")
public class ChangeCoder implements Encoder.TextStream<Change> {

    private final ThreadLocal<ObjectMapper> _mapper = new ThreadLocal<ObjectMapper>() {

        @Override
        protected ObjectMapper initialValue() {
            return new ObjectMapper();
        }
    };

    @Override
    public void init(final EndpointConfig endpointConfig) {
    }

    @Override
    public void encode(final Change object, final Writer writer) throws EncodeException, IOException {
        this._mapper.get().writeValue(writer, object);
    }

    @Override
    public void destroy() {

    }
}
