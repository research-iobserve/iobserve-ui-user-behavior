package org.iobserve.service;

import org.iobserve.domain.Visit;

/**
 * Service interface for the visit model
 *
 * @author Daniel Banck
 */
public interface VisitService extends Service<Visit> {

    Iterable<Visit> findAll(Long applicationId);
}
