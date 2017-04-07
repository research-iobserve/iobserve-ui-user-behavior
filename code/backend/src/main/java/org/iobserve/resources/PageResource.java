package org.iobserve.resources;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.iobserve.domain.Application;
import org.iobserve.domain.Page;
import org.iobserve.service.ApplicationService;
import org.iobserve.service.PageService;
import org.iobserve.services.websocket.ChangeStreamService;
import org.iobserve.websocket.Change;

/**
 * REST service for pages
 *
 * @author Daniel Banck
 */
@Path("v1")
@Produces(MediaType.APPLICATION_JSON)
public class PageResource {

    private static final ChangeStreamService streamService = ChangeStreamService.INSTANCE;

    @Inject
    ApplicationService applicationService;

    @Inject
    PageService pageService;

    @GET
    @Path("/applications/{applicationId}/pages")
    public Iterable<Page> getAll(@PathParam("applicationId") final Long applicationId) {
        return this.pageService.findAll(applicationId);
    }

    @POST
    @Path("/applications/{applicationId}/pages")
    public Page create(@PathParam("applicationId") final Long applicationId, final Page page) {
        final Application a = this.applicationService.find(applicationId);
        page.setApplication(a);
        page.setId(null);

        final Page p = this.pageService.createOrUpdate(page, 1);
        final Change<Page> c = new Change<>("ADD_PAGE", p);
        PageResource.streamService.broadcastChange(applicationId, c);

        return p;
    }

    @DELETE
    @Path("/applications/{applicationId}/pages/{pageId}")
    public void deleteApplication(@PathParam("applicationId") final Long applicationId,
            @PathParam("pageId") final Long id) {

        final Page p = this.pageService.delete(id);
        final Change<Page> c = new Change<>("DELETE_PAGE", p);
        PageResource.streamService.broadcastChange(applicationId, c);
    }
}
