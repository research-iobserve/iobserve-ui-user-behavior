// @flow

import React from "react";
import { Jumbotron, Container } from "reactstrap";
import styled from "styled-components";

import H1 from "../../components/H1";

const StyledJumbotron = styled(Jumbotron)`
  background-color: #fff;
  margin-bottom: 0;
  padding-bottom: 6rem;
  padding-top: 6rem;
`;

function Intro() {
  return (
    <StyledJumbotron>
      <Container>
        <H1>User Model Behavior Visualization</H1>
        <p className="lead">
          Below is a list of currently available user behavior graphs. Please select one to inspect it.
        </p>
      </Container>
    </StyledJumbotron>
  );
}

export default Intro;
