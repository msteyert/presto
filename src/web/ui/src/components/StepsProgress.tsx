import React from 'react';
import { Step } from 'semantic-ui-react';

type Props = {
  step: number;
};

const onClickFactory = (step: number) => () => {
  const target = document.getElementById(`step-${step}-container`);
  if (target) {
    target.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
};

const Steps = ({ step = 0 }: Props) => (
  <Step.Group ordered size="small">
    <Step completed={step > 0} active={step === 0} onClick={onClickFactory(1)}>
      <Step.Content>
        <Step.Title>Start</Step.Title>
        <Step.Description>Enter Sequence information</Step.Description>
      </Step.Content>
    </Step>

    <Step completed={step > 1} active={step === 1} onClick={onClickFactory(2)}>
      <Step.Content>
        <Step.Title>Spacer</Step.Title>
        <Step.Description>Select your spacer</Step.Description>
      </Step.Content>
    </Step>

    <Step completed={step > 2} active={step === 2} onClick={onClickFactory(3)}>
      <Step.Content>
        <Step.Title>pegRNA</Step.Title>
        <Step.Description>Design your pegRNA</Step.Description>
      </Step.Content>
    </Step>

    <Step completed={step > 3} active={step === 3} onClick={onClickFactory(4)}>
      <Step.Content>
        <Step.Title>PE3</Step.Title>
        <Step.Description>Choose a PE3 sequence</Step.Description>
      </Step.Content>
    </Step>

    <Step completed={step > 4} active={step === 4} onClick={onClickFactory(5)}>
      <Step.Content>
        <Step.Title>Cloning</Step.Title>
        <Step.Description>Choose your cloning strategy</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
);

export default Steps;
