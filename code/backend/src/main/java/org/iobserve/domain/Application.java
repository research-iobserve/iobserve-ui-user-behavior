package org.iobserve.domain;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

/**
 * Application Model, represents nodes from type application
 *
 * @author Daniel Banck
 */
@NodeEntity
public class Application extends Entity {

    @JsonProperty("name")
    String name;

    @JsonProperty("custom")
    Boolean custom;

    @JsonProperty("description")
    String description;

    @Relationship(type = "CONTAINS")
    Set<Page> pages;

    public Application() {
        this.pages = new HashSet<>();
    }

    public Application(final String name) {
        this();
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }
}