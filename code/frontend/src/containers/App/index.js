// @flow

/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { SettingsState } from "../../models";

import type { LayoutT } from "../../types";
import Header from "../../components/Header";
import { makeSelectSettings } from "./selectors";
import { changeLayout } from "../../actions/settings";

type Props = {
  children?: React.Element<*>,
  settings: SettingsState,
  changeLayout: (LayoutT) => void
};

export class App extends React.Component {
  props: Props;

  changeSettings: (string, LayoutT) => void;

  constructor(props: Props) {
    super(props);

    this.changeSettings = (key, value) => {
      if (key === "layout") {
        this.props.changeLayout(value);
      }
    };
  }

  render() {
    return (
      <div>
        <Header
          changeSettings={this.changeSettings}
          settings={this.props.settings}
        />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const select = createStructuredSelector({
  settings: makeSelectSettings()
});
const actions = {
  changeLayout
};

export default connect(select, actions)(App);
