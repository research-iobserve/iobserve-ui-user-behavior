// @flow
import React from "react";
import cytoscape from "cytoscape";
import { List } from "immutable";

import type { LayoutT } from "../../types";
import { graphVisualStyle } from "./VisualStyle";
import Wrapper from "./Wrapper";
import { Page, Visit } from "../../models";
import { formatPages, formatVisits } from "../../utils/graph";

type Props = {
  pages: List<Page>,
  visits: List<Visit>,
  layout: LayoutT,
  selectPage: (?Page) => void,
  selectVisit: (?Visit) => void
};

class ApplicationGraph extends React.Component {
  props: Props;

  cy = null;
  cytoscapeTag = "cy";

  createCyjs() {
    const nodes = formatPages(this.props.pages);
    const edges = formatVisits(this.props.visits);

    this.cy = cytoscape({
      container: document.getElementById(this.cytoscapeTag),
      elements: nodes.concat(edges),
      style: graphVisualStyle,
      layout: {
        name: this.props.layout,
        randomize: true
      }
    });
    this.cy.on("tap", "node", evt => {
      const pageNode = evt.cyTarget;
      const page = this.props.pages.find(
        page => `${page.get("id")}` === pageNode.id()
      );
      this.props.selectVisit(undefined);
      this.props.selectPage(page);
    });
    // $FlowFixMe: Bug in flow
    this.cy.on("tap", "edge", evt => {
      const visitEdge = evt.cyTarget;
      const visit = this.props.visits.find(
        visit => `${visit.get("id")}` === visitEdge.id()
      );
      this.props.selectPage(undefined);
      this.props.selectVisit(visit);
    });
  }

  componentDidMount() {
    this.createCyjs();
  }

  componentDidUpdate() {
    if (this.cy) {
      this.cy.destroy();
    }
    this.createCyjs();
  }

  shouldComponentUpdate(nextProps: Props) {
    // $FlowFixMe: Bug in flow
    const graphUnchanged = nextProps.pages.equals(this.props.pages) &&
      // $FlowFixMe: Bug in flow
      nextProps.visits.equals(this.props.visits);
    const layoutUnchanged = nextProps.layout === this.props.layout;

    if (graphUnchanged && layoutUnchanged) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <Wrapper>
        <div id={this.cytoscapeTag} style={{ height: "100%", width: "100%" }} />
      </Wrapper>
    );
  }
}

export default ApplicationGraph;
