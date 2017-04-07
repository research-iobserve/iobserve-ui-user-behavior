package org.iobserve.service;

/**
 * Generic interface for all service interfaces
 *
 * @author Daniel Banck
 *
 * @param <T>
 */
public interface Service<T> {

    Iterable<T> findAll();

    T find(Long id);

    T delete(Long id);

    T createOrUpdate(T object);

    T createOrUpdate(T object, int depth);
}
