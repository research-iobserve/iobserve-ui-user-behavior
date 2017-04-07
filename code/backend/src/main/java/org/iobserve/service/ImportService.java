package org.iobserve.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

import org.iobserve.Neo4jSessionFactory;
import org.neo4j.ogm.session.Session;

/**
 * Simple imports service which reads cql from a file and writes it into a neo4j database
 *
 * @author Daniel Banck
 */
public class ImportService {

    public static void reload() {
        final Session session = Neo4jSessionFactory.getInstance().getNeo4jSession();
        session.purgeDatabase();
        session.query(ImportService.load("ubm.cql"), new HashMap<>());
    }

    static String load(final String cqlFile) {
        final StringBuilder sb = new StringBuilder();
        final BufferedReader reader = new BufferedReader(
                new InputStreamReader(Thread.currentThread().getContextClassLoader().getResourceAsStream(cqlFile)));
        String line;

        try {
            while ((line = reader.readLine()) != null) {
                sb.append(line);
                sb.append(" ");
            }
        } catch (final Exception e) {
            throw new RuntimeException(e);
        }
        return sb.toString();
    }

}
