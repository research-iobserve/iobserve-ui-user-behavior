package org.iobserve.service;

import java.util.HashMap;
import java.util.Map;

import org.iobserve.domain.Page;

/**
 * Service for the page model
 *
 * @author Daniel Banck
 */
public class PageServiceImpl extends GenericService<Page> implements PageService {

    @Override
    Class<Page> getEntityType() {
        return Page.class;
    }

    @Override
    public Iterable<Page> findAll(final Long applicationId) {
        final String query = "MATCH (page:Page)-[:CONTAINS]-(app) WHERE ID(app) = {applicationId} RETURN page";
        final Map<String, Object> params = new HashMap<>();
        params.put("applicationId", applicationId);

        return this.session.query(Page.class, query, params);
    }
}
