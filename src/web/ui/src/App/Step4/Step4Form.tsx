import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { useStep5Loading } from '../../hooks';
import PE3Options from './PE3Options';

type Props = {
  onSubmit: () => Promise<void>;
};

const Step4Form = ({ onSubmit }: Props) => {
  const { step5Loading } = useStep5Loading();
  return (
    <div>
      <Grid.Row>
        <Form onSubmit={onSubmit}>
          <PE3Options />
          <div style={{ height: 15 }} />
          <Form.Button content="Next" loading={step5Loading} primary />
        </Form>
      </Grid.Row>
    </div>
  );
};

export default Step4Form;
