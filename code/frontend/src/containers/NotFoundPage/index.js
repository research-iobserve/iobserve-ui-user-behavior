// @flow

/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";
import { Container } from "reactstrap";

export default function NotFound() {
  return (
    <Container>
      <h1>
        Page not found.
      </h1>
    </Container>
  );
}
