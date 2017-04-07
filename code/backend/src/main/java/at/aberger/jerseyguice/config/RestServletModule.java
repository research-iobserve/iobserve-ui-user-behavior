package at.aberger.jerseyguice.config;

import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.inject.Injector;
import com.google.inject.Scopes;
import com.google.inject.servlet.ServletModule;

import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.spi.Container;
import org.glassfish.jersey.server.spi.ContainerLifecycleListener;
import org.glassfish.jersey.servlet.ServletContainer;
import org.iobserve.services.websocket.ChangeStreamService;
import org.iobserve.util.CORSResponseFilter;
import org.jvnet.hk2.guice.bridge.api.GuiceBridge;
import org.jvnet.hk2.guice.bridge.api.GuiceIntoHK2Bridge;

public abstract class RestServletModule extends ServletModule {
    private static final Logger log = Logger.getLogger(RestServletModule.class.getCanonicalName());

    @Override
    abstract protected void configureServlets();

    public interface RestKeyBindingBuilder {
        void packages(String... packages);
    }

    protected RestKeyBindingBuilder rest(final String... urlPatterns) {
        return new RestKeyBindingBuilderImpl(Arrays.asList(urlPatterns));
    }

    private class RestKeyBindingBuilderImpl implements RestKeyBindingBuilder {
        List<String> paths;

        public RestKeyBindingBuilderImpl(final List<String> paths) {
            this.paths = paths;
        }

        private boolean checkIfPackageExistsAndLog(final String packge) {
            boolean exists = false;
            final String resourcePath = packge.replace(".", "/");
            final URL resource = this.getClass().getClassLoader().getResource(resourcePath);
            if (resource != null) {
                exists = true;
                RestServletModule.log.log(Level.INFO, "rest(" + this.paths + ").packages(" + packge + ")");
            } else {
                RestServletModule.log.log(Level.INFO,
                        "No Beans in '" + packge + "' found. Requests " + this.paths + " will fail.");
            }
            return exists;
        }

        @Override
        public void packages(final String... packages) {
            final StringBuilder sb = new StringBuilder();

            for (final String pkg : packages) {
                if (sb.length() > 0) {
                    sb.append(',');
                }
                this.checkIfPackageExistsAndLog(pkg);
                sb.append(pkg);
            }
            final Map<String, String> params = new HashMap<>();
            params.put("javax.ws.rs.Application", GuiceResourceConfig.class.getCanonicalName());
            if (sb.length() > 0) {
                params.put("jersey.config.server.provider.packages", sb.toString());
            }
            RestServletModule.this.bind(ServletContainer.class).in(Scopes.SINGLETON);
            for (final String path : this.paths) {
                RestServletModule.this.serve(path).with(ServletContainer.class, params);
            }
        }
    }
}

class GuiceResourceConfig extends ResourceConfig {

    private static ChangeStreamService changeStreamService;

    public GuiceResourceConfig() {
        this.register(CORSResponseFilter.class);
        this.register(new ContainerLifecycleListener() {
            @Override
            public void onStartup(final Container container) {
                final ServletContainer servletContainer = (ServletContainer) container;
                final ServiceLocator serviceLocator = container.getApplicationHandler().getServiceLocator();
                GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
                final GuiceIntoHK2Bridge guiceBridge = serviceLocator.getService(GuiceIntoHK2Bridge.class);
                final Injector injector = (Injector) servletContainer.getServletContext()
                        .getAttribute(Injector.class.getName());
                guiceBridge.bridgeGuiceInjector(injector);
            }

            @Override
            public void onReload(final Container container) {
            }

            @Override
            public void onShutdown(final Container container) {
            }
        });
    }

    public static ChangeStreamService getChangeStreamService() {
        return GuiceResourceConfig.changeStreamService;
    }
}
