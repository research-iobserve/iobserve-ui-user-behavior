package org.iobserve.service;

import org.iobserve.Neo4jSessionFactory;
import org.iobserve.domain.Entity;
import org.neo4j.ogm.session.Session;

/**
 * Generic base service for all services
 *
 * @author Daniel Banck
 *
 * @param <T>
 */
abstract class GenericService<T> implements Service<T> {

    private static final int DEPTH_LIST = 0;
    private static final int DEPTH_ENTITY = 1;
    protected Session session = Neo4jSessionFactory.getInstance().getNeo4jSession();

    @Override
    public Iterable<T> findAll() {
        return this.session.loadAll(this.getEntityType(), GenericService.DEPTH_LIST);
    }

    @Override
    public T find(final Long id) {
        return this.session.load(this.getEntityType(), id, GenericService.DEPTH_ENTITY);
    }

    @Override
    public T delete(final Long id) {
        final T t = this.session.load(this.getEntityType(), id);
        this.session.delete(t);

        return t;
    }

    @Override
    public T createOrUpdate(final T entity) {
        return this.createOrUpdate(entity, 0);
    }

    @Override
    public T createOrUpdate(final T entity, final int depth) {
        this.session.save(entity, depth);
        return this.find(((Entity) entity).getId());
    }

    abstract Class<T> getEntityType();
}
