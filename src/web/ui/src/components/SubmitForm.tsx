import React, { Component, ChangeEvent } from 'react';
import { Form, InputOnChangeData } from 'semantic-ui-react';

export type SubmitFormState = {
  wtSeq: string;
  mut: string;
  spacer: string;
  pam: string;
  PBSmin: string;
  PBSmax: string;
  rtMin: string;
  rtMax: string;
  showAdvanced: boolean;
};
type Props = {
  onSubmit: (wtSeq: string, mut: string, spacer: string) => Promise<void>;
};

class SubmitForm extends Component<Props, SubmitFormState> {
  state = {
    wtSeq: '',
    mut: '',
    spacer: '',
    pam: 'NGG',
    PBSmin: '8',
    PBSmax: '18',
    rtMin: '9',
    rtMax: '16',
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
    const { wtSeq, mut, spacer } = this.state;
    this.props.onSubmit(wtSeq, mut, spacer);
  };

  handleAdvancedToggle = (e: any) => {
    e.preventDefault();
    this.setState((state) => ({ showAdvanced: !state.showAdvanced }));
  };

  calcRtRange = (state: SubmitFormState) => {
    const mutLength = state.mut.length;
    let rtMin = 9;
    let rtMax = 16;
    if (mutLength > 4) {
      rtMin = mutLength + 6;
      rtMax = mutLength + 16;
    }
    if (mutLength > 8) {
      rtMin = mutLength + 8;
      rtMax = mutLength + 22;
    }
    if (mutLength > 20) {
      rtMin = mutLength + 10;
      rtMax = mutLength + 30;
    }
    this.setState(() => ({ rtMin: rtMin.toString(), rtMax: rtMax.toString() }));
  };

  render() {
    const {
      wtSeq,
      mut,
      spacer,
      pam,
      rtMin,
      rtMax,
      PBSmin,
      PBSmax,
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
                name="PBSmin"
                value={PBSmin}
                onChange={this.handleChange}
                required
              />
              <Form.Input
                label="Max PBS length"
                placeholder="18"
                name="PBSmax"
                value={PBSmax}
                onChange={this.handleChange}
                required
              />
              <Form.Input
                label="Min RT length"
                placeholder="8"
                name="rtMin"
                value={rtMin}
                onChange={this.handleRTChange}
                required
              />
              <Form.Input
                label="Max RT length"
                placeholder="18"
                name="rtMax"
                value={rtMax}
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
