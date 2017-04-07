/**
 *
 */
package org.iobserve.service;

import org.iobserve.domain.Page;

/**
 * Service interface for the page model
 *
 * @author Daniel Banck
 */
public interface PageService extends Service<Page> {

    Iterable<Page> findAll(Long applicationId);
}
