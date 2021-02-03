import React, { Component, ChangeEvent, Fragment } from 'react';
import { Divider, Form, InputOnChangeData } from 'semantic-ui-react';
import SpacerError from './SpacerError';

export type SubmitFormState = {
  wtSeq: string;
  mut: string;
  customSpacer: string;
  pam: string;
  minPbs: string;
  maxPbs: string;
  minRt: string;
  maxRt: string;
  showAdvanced: boolean;
};
type Props = {
  onSubmit: (
    wtSeq: string,
    mut: string,
    customSpacer: string,
    pam: string,
    minPbs: number,
    maxPbs: number,
    minRt: number,
    maxRt: number,
  ) => Promise<void>;
  loading: boolean;
};

class SubmitForm extends Component<Props, SubmitFormState> {
  state = {
    wtSeq: '',
    mut: '',
    customSpacer: '',
    pam: 'NGG',
    minPbs: '8',
    maxPbs: '18',
    minRt: '9',
    maxRt: '16',
    showAdvanced: false,
  };

  handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData,
  ) => {
    this.setState((state) => {
      const newState = {
        ...state,
        [name]: value,
      };
      this.calcRtRange(newState);
      return newState;
    });
  };

  handleRTChange = (
    e: ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData,
  ) =>
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));

  handleSubmit = async () => {
    // const { name, email } = this.state;
    // this.setState({ submittedName: name, submittedEmail: email });
    const {
      wtSeq,
      mut,
      customSpacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    } = this.state;
    this.props.onSubmit(
      wtSeq,
      mut,
      customSpacer,
      pam,
      parseInt(minPbs),
      parseInt(maxPbs),
      parseInt(minRt),
      parseInt(maxRt),
    );
  };

  handleAdvancedToggle = (e: any) => {
    e.preventDefault();
    this.setState((state) => ({ showAdvanced: !state.showAdvanced }));
  };

  calcRtRange = (state: SubmitFormState) => {
    const mutLength = state.mut.length;
    let minRt = 9;
    let maxRt = 16;
    if (mutLength > 4) {
      minRt = mutLength + 6;
      maxRt = mutLength + 16;
    }
    if (mutLength > 8) {
      minRt = mutLength + 8;
      maxRt = mutLength + 22;
    }
    if (mutLength > 20) {
      minRt = mutLength + 10;
      maxRt = mutLength + 30;
    }
    this.setState(() => ({ minRt: minRt.toString(), maxRt: maxRt.toString() }));
  };

  render() {
    const {
      wtSeq,
      mut,
      customSpacer,
      pam,
      minRt,
      maxRt,
      minPbs,
      maxPbs,
      showAdvanced,
    } = this.state;

    return (
      <div>
        <SpacerError />
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
          {showAdvanced && (
            <Fragment>
              <Divider />
              <h3>Advanced Options</h3>
              <Form.Input
                label="Custom PE spacer sequence"
                placeholder=""
                name="customSpacer"
                value={customSpacer}
                onChange={this.handleChange}
              />
              <Form.Group>
                <Form.Input
                  label="Min PBS length"
                  placeholder="8"
                  name="minPbs"
                  value={minPbs}
                  onChange={this.handleChange}
                  width="4"
                  required
                />
                <Form.Input
                  label="Max PBS length"
                  placeholder="18"
                  name="maxPbs"
                  value={maxPbs}
                  onChange={this.handleChange}
                  width="4"
                  required
                />
                <Form.Input
                  label="Min RT length"
                  placeholder="8"
                  name="minRt"
                  value={minRt}
                  onChange={this.handleRTChange}
                  width="4"
                  required
                />
                <Form.Input
                  label="Max RT length"
                  placeholder="18"
                  name="maxRt"
                  value={maxRt}
                  onChange={this.handleRTChange}
                  width="4"
                  required
                />
              </Form.Group>
              <Form.Input
                label="PAM sequence (use IUPAC ambiguity as needed)"
                placeholder="NGG"
                name="pam"
                value={pam}
                onChange={this.handleChange}
                width="6"
                required
              />
            </Fragment>
          )}
          <Form.Group>
            <Form.Button content="Next" loading={this.props.loading} primary />
            <Form.Button
              content={`${showAdvanced ? 'Hide' : 'Show'} Advanced Options`}
              onClick={this.handleAdvancedToggle}
              basic
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SubmitForm;
