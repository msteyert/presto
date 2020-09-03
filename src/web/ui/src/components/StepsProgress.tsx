import React from 'react';
import { Step } from 'semantic-ui-react';

type Props = {
  step: number;
};

const Steps = ({ step = 0 }: Props) => (
  <Step.Group ordered size="small">
    <Step completed={step > 0} active={step === 0}>
      <Step.Content>
        <Step.Title>Enter</Step.Title>
        <Step.Description>Enter Sequence information</Step.Description>
      </Step.Content>
    </Step>

    <Step completed={step > 1} active={step === 1}>
      <Step.Content>
        <Step.Title>Design</Step.Title>
        <Step.Description>Design your pegRNA</Step.Description>
      </Step.Content>
    </Step>

    <Step completed={step > 2} active={step === 2}>
      <Step.Content>
        <Step.Title>Build</Step.Title>
        <Step.Description>Build cloning constructs</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
);

export default Steps;
