import React, { Fragment } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import OutputTabs from './OutputTabs';
import FullResultsButton from './FullResultsButton';
import { useStep } from '../../hooks';

const Step2 = () => {
  const { step } = useStep();
  return (
    <Fragment>
      <Grid.Row>
        <Grid.Column width={14}>
          <div id="step-3-container">
            <Segment color={step === 2 ? 'grey' : undefined}>
              <h2>pegRNA</h2>
              <OutputTabs />
            </Segment>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={14}>
          <FullResultsButton />
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  );
};

export default Step2;
