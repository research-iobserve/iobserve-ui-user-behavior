package org.iobserve.service;

import java.util.HashMap;
import java.util.Map;

import org.iobserve.domain.Visit;

public class VisitServiceImpl extends GenericService<Visit> implements VisitService {

    @Override
    Class<Visit> getEntityType() {
        return Visit.class;
    }

    @Override
    public Iterable<Visit> findAll(final Long applicationId) {
        final String query = "MATCH (start_page:Page)-[r:VISIT]->(end_page:Page) MATCH (start_page)-[:CONTAINS]-(app) WHERE ID(app) = {applicationId} RETURN r,start_page,end_page";
        final Map<String, Object> params = new HashMap<>();
        params.put("applicationId", applicationId);

        return this.session.query(Visit.class, query, params);
    }
}
