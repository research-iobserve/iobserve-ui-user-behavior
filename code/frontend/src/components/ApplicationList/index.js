// @flow

import React from "react";
import { Container, Row } from "reactstrap";
import styled from "styled-components";
import type { List } from "immutable";

import { Application } from "../../models";
import ApplicationListItem from "../../components/ApplicationListItem";

const StyledApplicationList = styled.div`
  background-color: #f7f7f7;
  padding-bottom: 3rem;
  padding-top: 3rem;
`;

const StyledRow = styled(Row)`
  flex: 1;
  justify-content: space-between;
`;

type Props = {
  applications: List<Application>,
  isEditor: boolean
};

function ApplicationList(props: Props) {
  return (
    <StyledApplicationList>
      <Container>
        <StyledRow>
          {props.applications.map(application => (
            <ApplicationListItem
              key={application.get("id")}
              application={application}
              isEditor={props.isEditor}
            />
          ))}
        </StyledRow>
      </Container>
    </StyledApplicationList>
  );
}

export default ApplicationList;
