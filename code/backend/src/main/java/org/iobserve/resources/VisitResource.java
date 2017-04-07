package org.iobserve.resources;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.iobserve.domain.Visit;
import org.iobserve.service.ApplicationService;
import org.iobserve.service.VisitService;
import org.iobserve.services.websocket.ChangeStreamService;
import org.iobserve.websocket.Change;

/**
 * REST service for visits
 *
 * @author Daniel Banck
 */
@Path("v1")
@Produces(MediaType.APPLICATION_JSON)
public class VisitResource {

    private static final ChangeStreamService streamService = ChangeStreamService.INSTANCE;

    @Inject
    ApplicationService applicationService;

    @Inject
    VisitService visitService;

    @GET
    @Path("/applications/{applicationId}/visits")
    public Iterable<Visit> getAll(@PathParam("applicationId") final Long applicationId) {
        return this.visitService.findAll(applicationId);
    }

    @POST
    @Path("/applications/{applicationId}/visits")
    public Visit create(@PathParam("applicationId") final Long applicationId, final Visit visit) {
        visit.setId(null);
        final Visit v = this.visitService.createOrUpdate(visit);

        final Change<Visit> c = new Change<>("ADD_VISIT", v);
        VisitResource.streamService.broadcastChange(applicationId, c);

        return v;
    }

    @DELETE
    @Path("/applications/{applicationId}/visits/{visitId}")
    public void deleteApplication(@PathParam("applicationId") final Long applicationId,
            @PathParam("visitId") final Long id) {

        final Visit v = this.visitService.delete(id);
        final Change<Visit> c = new Change<>("DELETE_VISIT", v);
        VisitResource.streamService.broadcastChange(applicationId, c);
    }
}
