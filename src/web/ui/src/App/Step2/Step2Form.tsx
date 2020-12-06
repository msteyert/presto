import React from 'react';
import { Form } from 'semantic-ui-react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import {
  useSequencePredictions,
  useSpacerOptions,
  useStep3Loading,
} from '../../hooks';

type Props = {
  onSubmit: () => Promise<void>;
};

const Step2Form = ({ onSubmit }: Props) => {
  const { spacerOptions } = useSpacerOptions();
  const { setSpacer } = useSequencePredictions();
  const { step3Loading } = useStep3Loading();
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <SequenceOptionsDropDown
          title=""
          options={spacerOptions}
          onChange={setSpacer}
        />
        <div style={{ height: 15 }} />
        <Form.Button content="Next" loading={step3Loading} primary />
      </Form>
    </div>
  );
};

export default Step2Form;
