import React from 'react';
import { Step } from 'semantic-ui-react';

type Props = {
  step: number;
  vertical?: boolean;
};

const onClickFactory = (step: number) => () => {
  const target = document.getElementById(`step-${step}-container`);
  if (target) {
    target.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
};

const Steps = ({ step = 0, vertical = false }: Props) => (
  <Step.Group ordered size="small" vertical={vertical}>
    <Step completed={step > 0} active={step === 0} onClick={onClickFactory(1)}>
      <Step.Content>
        <Step.Description>Enter Sequence</Step.Description>
      </Step.Content>
    </Step>

    <Step
      completed={step > 1}
      active={step === 1}
      disabled={step < 1}
      onClick={onClickFactory(2)}
    >
      <Step.Content>
        <Step.Description>Select your spacer</Step.Description>
      </Step.Content>
    </Step>

    <Step
      completed={step > 2}
      active={step === 2}
      disabled={step < 2}
      onClick={onClickFactory(3)}
    >
      <Step.Content>
        <Step.Description>Design your pegRNA</Step.Description>
      </Step.Content>
    </Step>

    <Step
      completed={step > 3}
      active={step === 3}
      disabled={step < 3}
      onClick={onClickFactory(4)}
    >
      <Step.Content>
        <Step.Description>Choose a PE3 sequence</Step.Description>
      </Step.Content>
    </Step>

    <Step
      completed={step > 4}
      active={step === 4}
      disabled={step < 4}
      onClick={onClickFactory(5)}
    >
      <Step.Content>
        <Step.Description>Cloning strategy</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
);

export default Steps;
