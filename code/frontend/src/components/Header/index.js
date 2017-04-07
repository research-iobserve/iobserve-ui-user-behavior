// @flow

import React from "react";
import { List } from "immutable";
import { Link } from "react-router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import type { LayoutT } from "../../types";
import { SettingsState } from "../../models";

type Props = {
  changeSettings: (string, LayoutT) => void,
  settings: SettingsState
};
type State = {
  isOpen: boolean,
  editorDropdown: boolean,
  settingsDropdown: boolean
};

class Header extends React.Component {
  props: Props;
  state: State;

  // TODO: combine with type
  layouts = List(["cose", "grid", "breadthfirst"]);

  toggle: (string) => () => void;

  constructor(props: Props) {
    super(props);

    this.toggle = what => () => this.setState({
      [what]: !this.state[what]
    });

    this.state = {
      isOpen: false,
      editorDropdown: false,
      settingsDropdown: false
    };
  }

  render() {
    return (
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={this.toggle("isOpen")} />
        <NavbarBrand tag={Link} to="/">iObserve UBM Visualization</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Visualization</NavLink>
            </NavItem>
            <NavDropdown
              isOpen={this.state.editorDropdown}
              toggle={this.toggle("editorDropdown")}>
              <DropdownToggle nav caret>Editor</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/editor/new">New Application</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/editor">All Applications</Link>
                </DropdownItem>
              </DropdownMenu>
            </NavDropdown>
            <NavDropdown
              isOpen={this.state.settingsDropdown}
              toggle={this.toggle("settingsDropdown")}>
              <DropdownToggle nav caret>Settings</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Layout</DropdownItem>
                {this.layouts.map((layout, key) => (
                  <DropdownItem
                    onClick={() => this.props.changeSettings("layout", layout)}
                    key={key}>
                    {layout === this.props.settings.get("layout")
                      ? <strong>{layout}</strong>
                      : layout}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
