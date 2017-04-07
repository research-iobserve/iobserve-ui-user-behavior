package org.iobserve.service;

import org.iobserve.domain.Application;

/**
 * Service for the application model
 *
 * @author Daniel Banck
 */
public class ApplicationServiceImpl extends GenericService<Application> implements ApplicationService {

    @Override
    Class<Application> getEntityType() {
        return Application.class;
    }
}
