// @flow

/**
 * Dashboard
 *
 * This is the first page of the app, displaying a list of applications
 */

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { List } from "immutable";
import Loading from "react-loading-animation";

import { Application } from "../../models";
import Intro from "../../components/Intro";
import ApplicationList from "../../components/ApplicationList";
import { makeSelectApplications } from "./selectors";
import { loadApplications } from "../../actions/applications";

type Props = {
  loadApplications: () => void,
  applications: List<Application>
};

export class Dashboard extends React.Component {
  props: Props;

  componentDidMount() {
    this.props.loadApplications();
  }

  render() {
    const loaded = this.props.applications && this.props.applications.size > 0;

    return (
      <div>
        <Intro />
        {!loaded
          ? <Loading />
          : <ApplicationList
              applications={this.props.applications}
              isEditor={false}
            />}
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

export default connect(select, actions)(Dashboard);
