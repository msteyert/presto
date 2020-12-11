import React, { SetStateAction } from 'react';
import { Form } from 'semantic-ui-react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import {
  useSequencePredictions,
  useSpacerOptions,
  useStep,
  useStep3Loading,
} from '../../hooks';

type Props = {
  onSubmit: () => Promise<void>;
};

const onChangeFactory = (
  setSpacer: (u: SetStateAction<string>) => void,
  setStep: (u: SetStateAction<number>) => void,
  onSubmit: () => Promise<void>,
  step: number,
) => (sequence: string) => {
  setSpacer(sequence);
  if (step >= 2) {
    setStep(1);
    setTimeout(() => {
      onSubmit();
    }, 0);
  }
};

const Step2Form = ({ onSubmit }: Props) => {
  const { spacerOptions } = useSpacerOptions();
  const { setSpacer } = useSequencePredictions();
  const { step3Loading } = useStep3Loading();
  const { step, setStep } = useStep();
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <SequenceOptionsDropDown
          title=""
          options={spacerOptions.map((o) => o.spacer)}
          onChange={onChangeFactory(setSpacer, setStep, onSubmit, step)}
        />
        <div style={{ height: 15 }} />
        <Form.Button content="Next" loading={step3Loading} primary />
      </Form>
    </div>
  );
};

export default Step2Form;
