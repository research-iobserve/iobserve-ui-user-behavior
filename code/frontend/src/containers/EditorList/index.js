// @flow

/**
 * EditorList
 *
 * A list of all your custom graphs for editing
 */

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { createStructuredSelector } from "reselect";
import { List } from "immutable";
import { Container } from "reactstrap";
import Loading from "react-loading-animation";

import { Application } from "../../models";
import H1 from "../../components/H1";
import ApplicationList from "../../components/ApplicationList";
import { makeSelectApplications } from "./selectors";
import { loadApplications } from "../../actions/applications";

type Props = {
  loadApplications: () => void,
  applications: List<Application>
};

export class EditorList extends React.Component {
  props: Props;

  componentDidMount() {
    this.props.loadApplications();
  }

  render() {
    const loaded = this.props.applications && this.props.applications.size > 0;

    return (
      <div>
        <Container>
          <H1>All custom applications</H1>
          <p className="lead">
            Below is a list of all applications which can be edited. One can also create a new application
            {" "}
            <Link to="/editor/new">here</Link>
            .
          </p>
        </Container>
        {!loaded
          ? <Loading />
          : <ApplicationList applications={this.props.applications} isEditor />}
      </div>
    );
  }
}

const select = createStructuredSelector({
  applications: makeSelectApplications()
});
const actions = {
  loadApplications
};

export default connect(select, actions)(EditorList);
