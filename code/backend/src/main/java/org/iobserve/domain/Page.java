package org.iobserve.domain;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.iobserve.domain.util.DynamicPagePropertiesConverter;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.typeconversion.Convert;

/**
 * Page Model, represents nodes from type page
 *
 * @author Daniel Banck
 */
@NodeEntity
public class Page extends Entity {

    @JsonProperty("name")
    String name;

    @Relationship(type = "VISIT")
    Set<Visit> visits;

    @JsonProperty("extra")
    @Convert(DynamicPagePropertiesConverter.class)
    HashMap<String, String> extra;

    @JsonIgnore
    @Relationship(type = "CONTAINS", direction = Relationship.INCOMING)
    Application application;

    public void setApplication(final Application application) {
        this.application = application;
    }

    public Page() {
        this.visits = new HashSet<>();
    }

    public Page(final String name) {
        this();
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }
}
