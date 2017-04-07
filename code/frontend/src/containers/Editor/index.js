// @flow

/**
 * Editor
 *
 * Edit application graphs and create them from scratch
 */

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { List } from "immutable";
import Loading from "react-loading-animation";

import type { LayoutT } from "../../types";
import ApplicationGraph from "../../components/ApplicationGraph";
import PageEditor from "../../components/PageEditor";
import VisitEditor from "../../components/VisitEditor";
import H1 from "../../components/H1";
import { Application, Page, Visit } from "../../models";
import {
  makeSelectApplication,
  makeSelectPages,
  makeSelectVisits,
  makeSelectLayout
} from "../Application/selectors";
import { addApplication, loadApplications } from "../../actions/applications";
import { loadPages } from "../../actions/pages";
import { loadVisits } from "../../actions/visits";
import { addPageRequest } from "../../actions/pages";
import { addVisitRequest } from "../../actions/visits";
import { subscribe, unsubscribe } from "../../actions/applications";

export type Props = {
  addApplication: (number) => void,
  addPageRequest: (number, Page) => void,
  addVisitRequest: (number, Visit) => void,
  loadApplications: () => void,
  loadPages: (number) => void,
  loadVisits: (number) => void,
  subscribe: (number) => void,
  unsubscribe: () => void,
  application: Application,
  pages: List<Page>,
  visits: List<Visit>,
  layout: LayoutT,
  params: {
    id: number
  }
};

export class Editor extends React.Component {
  props: Props;
  applicationId: number;

  savePage: (Page) => void;
  saveVisit: (Visit) => void;

  constructor(props: Props) {
    super(props);

    this.applicationId = parseInt(props.params.id, 10);
    this.savePage = page => {
      this.props.addPageRequest(this.applicationId, page);
    };
    this.saveVisit = visit => {
      this.props.addVisitRequest(this.applicationId, visit);
    };
  }

  componentDidMount() {
    if (!this.props.application) {
      this.props.loadApplications();
    }
    this.props.loadPages(this.applicationId);
    this.props.loadVisits(this.applicationId);
    this.props.subscribe(this.applicationId);
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  renderContent() {
    return (
      <Row>
        <Col xs="3">
          <H1>{this.props.application.get("name")}</H1>
          <PageEditor savePage={this.savePage} />
          <hr />
          <VisitEditor pages={this.props.pages} saveVisit={this.saveVisit} />
        </Col>
        <Col xs="9">
          <ApplicationGraph
            layout={this.props.layout}
            pages={this.props.pages}
            visits={this.props.visits}
            selectPage={() => {}}
            selectVisit={() => {}}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const applicationLoaded = this.props.application;

    return (
      <Container fluid>
        {!applicationLoaded ? <Loading /> : this.renderContent()}
      </Container>
    );
  }
}

const select = () => {
  const getApplication = makeSelectApplication();
  const getPages = makeSelectPages();
  const getVisits = makeSelectVisits();
  return (state, props) => ({
    application: getApplication(state, props),
    pages: getPages(state, props),
    visits: getVisits(state, props),
    layout: makeSelectLayout()(state, props)
  });
};
const actions = {
  addApplication,
  loadApplications,
  loadPages,
  loadVisits,
  addPageRequest,
  addVisitRequest,
  subscribe,
  unsubscribe
};

export default connect(select, actions)(Editor);
