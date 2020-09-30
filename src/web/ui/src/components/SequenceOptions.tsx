import React, { Component, FormEvent } from 'react';
import { Form, Radio, FormCheckboxProps } from 'semantic-ui-react';

type Props = {
  options: string[];
  title: string;
};

export default class SequenceOptionsRadio extends Component<Props> {
  state = { value: this.props.options.length > 0 ? this.props.options[0] : '' };
  static defaultProps = { options: [] };
  handleChange = (
    e: FormEvent<HTMLInputElement>,
    { value }: FormCheckboxProps,
  ) => this.setState({ value });

  render() {
    return (
      <div style={{ textAlign: 'left' }}>
        <Form>
          <Form.Field>{this.props.title}</Form.Field>
          {this.props.options.map((option) => (
            <Form.Field>
              <Radio
                toggle
                label={option}
                name={option}
                value={option}
                checked={this.state.value === option}
                onChange={this.handleChange}
              />
            </Form.Field>
          ))}
        </Form>
      </div>
    );
  }
}
