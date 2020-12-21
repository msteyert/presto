import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useStep } from '../../hooks';
import FullResultsButton from './FullResultsButton';
import PegRNA from './PegRNA';
import Pe3sgRNA from './Pe3sgRNA';

const Step5 = () => {
  const { step } = useStep();
  return (
    <Grid.Row>
      <Grid.Column width={14}>
        <div id="step-5-container">
          <Segment color={step === 4 ? 'grey' : undefined}>
            <h2>Cloning</h2>
            <PegRNA />
            <div style={{ height: 15 }} />
            <Pe3sgRNA />
            <div style={{ height: 15 }} />
            <FullResultsButton />
          </Segment>
        </div>
      </Grid.Column>
    </Grid.Row>
  );
};
export default Step5;
