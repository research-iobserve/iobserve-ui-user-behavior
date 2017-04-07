package org.iobserve.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.iobserve.service.ImportService;

/**
 * Simple resource for filling the database with demo data
 *
 * @author Daniel Banck
 */
@Path("v1")
@Produces(MediaType.APPLICATION_JSON)
public class ImportResource {

    @GET
    @Path("/populateDatabase")
    public String populateDatabase() {
        ImportService.reload();

        return "ok";
    }
}
