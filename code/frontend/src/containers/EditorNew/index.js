// @flow

/**
* EditorList
*
* A list of all your custom graphs for editing
*/

import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { Application } from "../../models";
import { addApplicationRequest } from "../../actions/applications";

type Props = {
  addApplicationRequest: (Application) => void,
  router: Object
};
type State = {
  name: string,
  description: string,
  submitting: boolean
};

export class EditorNew extends React.Component {
  props: Props;
  state: State;

  handleChange: (SyntheticInputEvent) => void;
  handleSubmit: (Event) => void;
  cancel: (Event) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      submitting: false
    };

    this.handleChange = event => {
      const target = event.target;

      this.setState({
        [target.name]: target.value
      });
    };

    this.cancel = event => {
      event.preventDefault();
      this.props.router.push("/editor");
    };

    this.handleSubmit = event => {
      event.preventDefault();
      this.setState({
        submitting: true
      });

      this.props.addApplicationRequest(
        new Application({
          name: this.state.name,
          description: this.state.description,
          custom: true
        })
      );
    };
  }

  render() {
    return (
      <Modal isOpen backdrop="static">
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader>Create a new application</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Application Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.cancel}>Cancel</Button>
            <Button
              color="primary"
              disabled={this.state.submitting}
              type="submit">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

const select = () => ({});
const actions = {
  addApplicationRequest
};

export default connect(select, actions)(withRouter(EditorNew));
