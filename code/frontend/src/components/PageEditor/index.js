// @flow
import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import H3 from "../../components/H3";
import { Page } from "../../models";

type Props = {
  page?: Page,
  savePage: (Page) => void
};

type State = {
  name: string
};

class PageEditor extends React.Component {
  props: Props;
  state: State;

  handleChange: (SyntheticInputEvent) => void;
  handleSubmit: (Event) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleChange = event => {
      this.setState({
        name: event.target.value
      });
    };
    this.handleSubmit = event => {
      this.props.savePage(
        this.props.page
          ? this.props.page.set("name", this.state.name)
          : new Page({ name: this.state.name })
      );
      event.preventDefault();
      this.setState({
        name: ""
      });
    };
  }

  render() {
    return (
      <div>
        <H3>Page Editor</H3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label size="sm" for="pageName">Name</Label>
            <Input
              size="sm"
              type="text"
              name="pageName"
              id="pageName"
              placeholder="New Page Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button size="sm" type="submit">Save</Button>
        </Form>
      </div>
    );
  }
}

export default PageEditor;
