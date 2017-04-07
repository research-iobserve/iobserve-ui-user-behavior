package org.iobserve.resources;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.iobserve.domain.Application;
import org.iobserve.service.ApplicationService;

/**
 * REST service for applications
 *
 * @author Daniel Banck
 */
@Path("v1")
@Produces(MediaType.APPLICATION_JSON)
public class ApplicationResource {

    @Inject
    ApplicationService impl;

    @GET
    @Path("/applications")
    public Iterable<Application> getAll() {
        return this.impl.findAll();
    }

    @POST
    @Path("/applications")
    public Application createApplication(final Application application) {
        application.setId(null);
        return this.impl.createOrUpdate(application);
    }

    @GET
    @Path("/applications/{applicationId}")
    public Application getApplication(@PathParam("applicationId") final Long id) {
        return this.impl.find(id);
    }

    @PUT
    @Path("/applications/{applicationId}")
    public Application updateApplication(@PathParam("applicationId") final Long id,
            final Application applicationUpdate) {
        final Application application = this.impl.find(id);
        if (application == null) {
            throw new NotFoundException();
        }
        // TODO: find a better way
        application.setName(applicationUpdate.getName());

        return this.impl.createOrUpdate(application);
    }

    @DELETE
    @Path("/applications/{applicationId}")
    public void deleteApplication(@PathParam("applicationId") final Long id) {
        this.impl.delete(id);
    }

}
