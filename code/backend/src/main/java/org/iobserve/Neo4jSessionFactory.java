package org.iobserve;

import org.neo4j.ogm.session.Session;
import org.neo4j.ogm.session.SessionFactory;

/**
 * Handles the neo4j connections / sessions
 *
 * @author Daniel Banck
 */
public class Neo4jSessionFactory {

    private final static SessionFactory sessionFactory = new SessionFactory("org.iobserve.domain");
    private static Neo4jSessionFactory factory = new Neo4jSessionFactory();

    public static Neo4jSessionFactory getInstance() {
        return Neo4jSessionFactory.factory;
    }

    // prevent external instantiation
    private Neo4jSessionFactory() {
    }

    public Session getNeo4jSession() {
        return Neo4jSessionFactory.sessionFactory.openSession();
    }
}
