package org.iobserve.util;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.neo4j.ogm.typeconversion.CompositeAttributeConverter;

public abstract class DynamicPropertiesConverter implements CompositeAttributeConverter<Map<String, ?>> {

    private final Set<String> blacklist;

    public DynamicPropertiesConverter(final Class<?> clazz) {
        this.blacklist = new HashSet<>();
        this.addAllFields(clazz);
    }

    public DynamicPropertiesConverter(final Set<String> blacklist) {
        this.blacklist = blacklist;
    }

    public void addAllFields(final Class<?> type) {
        for (final Field field : type.getDeclaredFields()) {
            this.blacklist.add(field.getName());
        }
        if (type.getSuperclass() != null) {
            this.addAllFields(type.getSuperclass());
        }
    }

    @Override
    public Map<String, ?> toGraphProperties(final Map<String, ?> value) {
        final Map<String, ?> result = new HashMap<>(value);
        result.keySet().removeAll(this.blacklist);
        return result;
    }

    @Override
    public Map<String, ?> toEntityAttribute(final Map<String, ?> value) {
        return this.toGraphProperties(value);
    }
}