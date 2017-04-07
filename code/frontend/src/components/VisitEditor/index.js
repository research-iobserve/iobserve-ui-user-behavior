// @flow
import React from "react";
import { List } from "immutable";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import H3 from "../../components/H3";
import { Page, Visit } from "../../models";

type Props = {
  pages: List<Page>,
  visit?: Visit,
  saveVisit: (Visit) => void
};

type State = {
  action: string,
  start: number,
  end: number,
  count: number
};

class VisitEditor extends React.Component {
  props: Props;
  state: State;

  handleChange: (SyntheticInputEvent) => void;
  handleSubmit: (Event) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      action: "",
      start: -1,
      end: -1,
      count: 0
    };

    this.handleChange = event => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    };

    this.handleSubmit = event => {
      this.props.saveVisit(
        new Visit({
          action: this.state.action,
          count: this.state.count,
          start: this.props.pages.get(this.state.start),
          end: this.props.pages.get(this.state.end)
        })
      );
      event.preventDefault();
      this.setState({
        action: "",
        start: -1,
        end: -1,
        count: 0
      });
    };
  }

  render() {
    return (
      <div>
        <H3>Visit Editor</H3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label size="sm" for="visitAction">Action</Label>
            <Input
              size="sm"
              type="text"
              name="action"
              id="visitAction"
              placeholder="New Visit Action"
              value={this.state.action}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label size="sm" for="visitStart">Start</Label>
            <Input
              size="sm"
              type="select"
              name="start"
              id="visitStart"
              value={this.state.start}
              onChange={this.handleChange}>
              <option disabled value="-1"> -- select a page -- </option>
              {this.props.pages.map((page, key) => (
                <option key={key} value={key}>{page.get("name")}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label size="sm" for="visitEnd">End</Label>
            <Input
              size="sm"
              type="select"
              name="end"
              id="visitEnd"
              value={this.state.end}
              onChange={this.handleChange}>
              <option disabled value="-1"> -- select a page -- </option>
              {this.props.pages.map((page, key) => (
                <option key={key} value={key}>{page.get("name")}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label size="sm" for="count">User Flow Count</Label>
            <Input
              size="sm"
              type="text"
              name="count"
              id="count"
              placeholder="User flow count"
              value={this.state.count}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button size="sm" type="submit">Save</Button>
        </Form>
      </div>
    );
  }
}

export default VisitEditor;
