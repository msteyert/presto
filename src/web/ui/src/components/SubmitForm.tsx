import React, { Component, ChangeEvent } from 'react';
import { Form, InputOnChangeData } from 'semantic-ui-react';

export type SubmitFormState = {
  wtSeq: string;
  mut: string;
  spacer: string;
};
type Props = {
  onSubmit: (wtSeq: string, mut: string, spacer: string) => Promise<void>;
};

class SubmitForm extends Component<Props, SubmitFormState> {
  state = { wtSeq: '', mut: '', spacer: '' };

  handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData,
  ) =>
    this.setState({
      ...this.state,
      [name]: value,
    });

  handleSubmit = async () => {
    // const { name, email } = this.state;
    // this.setState({ submittedName: name, submittedEmail: email });
    const { wtSeq, mut, spacer } = this.state;
    this.props.onSubmit(wtSeq, mut, spacer);
  };

  render() {
    const { wtSeq, mut, spacer } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Wildtype sequence (parentheses around region to be mutated)"
            placeholder=""
            name="wtSeq"
            value={wtSeq}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            label="Mutation sequence (leave blank if performing deletion)"
            placeholder=""
            name="mut"
            value={mut}
            onChange={this.handleChange}
          />
          <Form.Input
            label="PE spacer sequence"
            placeholder=""
            name="spacer"
            value={spacer}
            onChange={this.handleChange}
            required
          />
          <Form.Group>
            <Form.Button content="Show Advanced Options" />
            <Form.Button content="Submit" primary />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SubmitForm;
