import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useStep } from '../../hooks';
import Submit from './Submit';
import PegRNAWarnings from './PegRNAWarnings';

const Step2 = () => {
  const { step } = useStep();
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <div id="step-3-container">
          <Segment color={step === 2 ? 'grey' : undefined}>
            <h2>pegRNA</h2>
            <PegRNAWarnings />
            <Submit />
          </Segment>
        </div>
      </Grid.Column>
    </Grid.Row>
  );
};
export default Step2;
