package org.iobserve.resources;

import javax.ws.rs.core.Application;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.junit.Assert;
import org.junit.Test;

public class ApplicationResourceTest extends JerseyTest {

    @Override
    protected Application configure() {
        return new ResourceConfig(ApplicationResource.class);
    }

    @Test
    public void getAllApplicationsTest() {
        final Response r = this.target("/v1/applications").request().get();
        Assert.assertEquals("should return status 200", 200, r.getStatus());
    }

    // @Test
    // public void getSingleGraphTest() {
    // final String graphId = "123";
    //
    // Response r = target("/v1/graphs/" + graphId).request().get();
    // assertEquals("should return status 200", 200, r.getStatus());
    //
    // Graph g = r.readEntity(Graph.class);
    // assertEquals("should return the correct graph", g.getName(), "my graph");
    // }

}
