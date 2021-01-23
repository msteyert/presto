import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useStep } from '../../hooks';
import Submit from './Submit';
import Pe3Warnings from './Pe3Warnings';

const Step2 = () => {
  const { step } = useStep();
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <div id="step-4-container">
          <Segment color={step === 3 ? 'grey' : undefined}>
            <h2>PE3</h2>
            <Pe3Warnings />
            <Submit />
          </Segment>
        </div>
      </Grid.Column>
    </Grid.Row>
  );
};
export default Step2;
