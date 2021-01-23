import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useStep } from '../../hooks';
import Submit from './Submit';

const Step2 = () => {
  const { step } = useStep();
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <div id="step-2-container">
          <Segment color={step === 1 ? 'grey' : undefined}>
            <h2>Spacer</h2>
            <Submit />
          </Segment>
        </div>
      </Grid.Column>
    </Grid.Row>
  );
};
export default Step2;
