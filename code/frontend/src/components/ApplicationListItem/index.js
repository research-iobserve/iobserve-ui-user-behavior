// @flow

import React from "react";
import { Link } from "react-router";
import { Card, CardBlock, CardTitle, CardLink, CardText } from "reactstrap";
import styled from "styled-components";

import { Application } from "../../models";

const StyledCard = styled(Card)`
  width: 30%;
`;

function ApplicationListItem(
  { application, isEditor }: { application: Application, isEditor: boolean }
) {
  return (
    <StyledCard>
      <CardBlock>
        <CardTitle>{application.get("name")}</CardTitle>
        <CardText>{application.get("description")}</CardText>
      </CardBlock>
      <CardBlock>
        <CardLink tag={Link} to={`/applications/${application.get("id")}`}>
          Inspect
        </CardLink>
        {isEditor
          ? <CardLink tag={Link} to={`/editor/${application.get("id")}`}>
            Edit
          </CardLink>
        : null}
      </CardBlock>
    </StyledCard>
  );
}

export default ApplicationListItem;
