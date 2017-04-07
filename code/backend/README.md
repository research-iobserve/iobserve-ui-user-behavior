# User Behavior Model Visualization Prototype

## Setup

Make sure that you have following requirements installed:

* `docker` version >= 17
* `docker-compose` version >= 1.11

## Getting started

Run `docker-compose up` to start a neo4j instance and the application.

You can access the application REST service at
`http://localhost:8080/ubm-backend`.

You might want to populate the database with some example data:
`http://localhost:8080/ubm-backend/v1/populateDatabase`.
