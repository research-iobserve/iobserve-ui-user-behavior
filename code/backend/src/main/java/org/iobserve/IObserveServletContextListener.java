package org.iobserve;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Scopes;
import com.google.inject.servlet.GuiceServletContextListener;

import org.iobserve.service.ApplicationService;
import org.iobserve.service.ApplicationServiceImpl;
import org.iobserve.service.PageService;
import org.iobserve.service.PageServiceImpl;
import org.iobserve.service.VisitService;
import org.iobserve.service.VisitServiceImpl;

import at.aberger.jerseyguice.config.RestServletModule;

/**
 * Main entry point which is referenced from the web.xml
 *
 * @author Daniel Banck
 */
public class IObserveServletContextListener extends GuiceServletContextListener {
    @Override
    protected Injector getInjector() {
        return Guice.createInjector(new RestServletModule() {
            @Override
            protected void configureServlets() {
                this.rest("/*").packages("org.iobserve.resources");

                this.bind(ApplicationService.class).to(ApplicationServiceImpl.class).in(Scopes.SINGLETON);
                this.bind(PageService.class).to(PageServiceImpl.class).in(Scopes.SINGLETON);
                this.bind(VisitService.class).to(VisitServiceImpl.class).in(Scopes.SINGLETON);
            }

        });
    }
}
