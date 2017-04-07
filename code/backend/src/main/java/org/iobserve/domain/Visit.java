package org.iobserve.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;

/**
 * Visit Model, represents edges between different pages
 *
 * @author Daniel Banck
 */
@RelationshipEntity(type = "VISIT")
public class Visit extends Entity {

    @JsonProperty("start")
    @StartNode
    Page fromPage;

    @JsonProperty("end")
    @EndNode
    Page endPage;

    @JsonProperty("count")
    int count;

    @JsonProperty("action")
    String action;

    public Visit() {
    }

}
