import React, { Component, ChangeEvent } from 'react';
import { Form, InputOnChangeData } from 'semantic-ui-react';

export type SubmitFormState = {
  wtSeq: string;
  mut: string;
  spacer: string;
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
    spacer: string,
    pam: string,
    minPbs: number,
    maxPbs: number,
    minRt: number,
    maxRt: number,
  ) => Promise<void>;
};

class SubmitForm extends Component<Props, SubmitFormState> {
  state = {
    wtSeq: '',
    mut: '',
    spacer: '',
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
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    } = this.state;
    this.props.onSubmit(
      wtSeq,
      mut,
      spacer,
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
      spacer,
      pam,
      minRt,
      maxRt,
      minPbs,
      maxPbs,
      showAdvanced,
    } = this.state;

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
          {showAdvanced && (
            <Form.Group>
              <Form.Input
                label="PAM sequence (use IUPAC ambiguity as needed)"
                placeholder="NGG"
                name="pam"
                value={pam}
                onChange={this.handleChange}
                required
              />
              <Form.Input
                label="Min PBS length"
                placeholder="8"
                name="minPbs"
                value={minPbs}
                onChange={this.handleChange}
                required
              />
              <Form.Input
                label="Max PBS length"
                placeholder="18"
                name="maxPbs"
                value={maxPbs}
                onChange={this.handleChange}
                required
              />
              <Form.Input
                label="Min RT length"
                placeholder="8"
                name="minRt"
                value={minRt}
                onChange={this.handleRTChange}
                required
              />
              <Form.Input
                label="Max RT length"
                placeholder="18"
                name="maxRt"
                value={maxRt}
                onChange={this.handleRTChange}
                required
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Button
              content="Show Advanced Options"
              onClick={this.handleAdvancedToggle}
            />
            <Form.Button content="Submit" primary />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SubmitForm;
