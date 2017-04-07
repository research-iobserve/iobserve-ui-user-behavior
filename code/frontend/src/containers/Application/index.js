// @flow

/**
 * Application
 *
 * Displays an application in detail
 */

import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { connect } from "react-redux";
import { List } from "immutable";
import { Link } from "react-router";
import Loading from "react-loading-animation";

import type { LayoutT } from "../../types";
import ApplicationGraph from "../../components/ApplicationGraph";
import H1 from "../../components/H1";
import H3 from "../../components/H3";
import H4 from "../../components/H4";
import { Application, Page, Visit } from "../../models";
import {
  makeSelectApplication,
  makeSelectPages,
  makeSelectVisits,
  makeSelectLayout
} from "./selectors";
import { loadApplications } from "../../actions/applications";
import { loadPages } from "../../actions/pages";
import { loadVisits } from "../../actions/visits";
import { subscribe, unsubscribe } from "../../actions/applications";

export type Props = {
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
type State = {
  page: ?Page,
  visit: ?Visit
};

export class ApplicationView extends React.Component {
  props: Props;
  state: State;
  applicationId: number;

  selectPage: (?Page) => void;
  selectVisit: (?Visit) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      page: null,
      visit: null
    };

    this.selectPage = page => {
      this.setState({
        page
      });
    };
    this.selectVisit = visit => {
      this.setState({
        visit
      });
    };
    this.applicationId = parseInt(props.params.id, 10);
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

  renderExtraAttributes(source: string) {
    if (this.state[source].get("extra").size > 0) {
      return (
        <div>
          <H4>Additional Attributes</H4>
          <Table size="sm">
            <tbody>
              {List(this.state[source].get("extra")).map((extra, id) => (
                <tr key={id}>
                  <th scope="row">{extra[0]}</th>
                  <td>{extra[1]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }

    return null;
  }

  renderSelectedPage() {
    if (this.state.page) {
      return (
        <div>
          <H3>Page: {this.state.page.get("name")}</H3>
          <Table size="sm">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{this.state.page && this.state.page.get("id")}</td>
              </tr>
              <tr>
                <th scope="row">Name</th>
                <td>{this.state.page && this.state.page.get("name")}</td>
              </tr>
            </tbody>
          </Table>
          {this.renderExtraAttributes("page")}
        </div>
      );
    }

    return null;
  }

  renderSelectedVisit() {
    if (this.state.visit) {
      return (
        <div>
          <H3>Visit: {this.state.visit.get("action")}</H3>
          <Table size="sm">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{this.state.visit && this.state.visit.get("id")}</td>
              </tr>
              <tr>
                <th scope="row">Action</th>
                <td>{this.state.visit && this.state.visit.get("action")}</td>
              </tr>
              <tr>
                <th scope="row">Start</th>
                <td>
                  {this.state.visit &&
                    this.state.visit.get("start").get("name")}
                  {" "}
                  (ID:
                  {" "}
                  {this.state.visit && this.state.visit.get("start").get("id")}
                  )
                </td>
              </tr>
              <tr>
                <th scope="row">End</th>
                <td>
                  {this.state.visit && this.state.visit.get("end").get("name")}
                  {" "}
                  (ID:
                  {" "}
                  {this.state.visit && this.state.visit.get("end").get("id")}
                  )
                </td>
              </tr>
              <tr>
                <th scope="row">Count</th>
                <td>{this.state.visit && this.state.visit.get("count")}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }

    return null;
  }

  renderContent() {
    return (
      <Row>
        <Col xs="3">
          <H1>{this.props.application.get("name")}</H1>
          <Link to={`/editor/${this.props.application.get("id")}`}>
            Open in Editor
          </Link>
          {this.renderSelectedPage()}
          {this.renderSelectedVisit()}
        </Col>
        <Col xs="9">
          <ApplicationGraph
            layout={this.props.layout}
            pages={this.props.pages}
            visits={this.props.visits}
            selectPage={this.selectPage}
            selectVisit={this.selectVisit}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const pages = this.props.pages;
    const visits = this.props.visits;
    const applicationLoaded = this.props.application &&
      (pages && pages.size > 0) &&
      (visits && visits.size > 0);
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
  loadApplications,
  loadPages,
  loadVisits,
  subscribe,
  unsubscribe
};

export default connect(select, actions)(ApplicationView);
