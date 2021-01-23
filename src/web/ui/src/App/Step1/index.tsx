import React, { Fragment } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { useStep } from '../../hooks';
import Submit from './Submit';

const Step1 = () => {
  const { step } = useStep();
  return (
    <Fragment>
      <div style={{ height: 40 }}></div>
      <Grid.Row>
        <Grid.Column width={16}>
          <div id="step-1-container">
            <Segment color={step === 0 ? 'grey' : undefined}>
              <h2>Start</h2>
              <Submit />
            </Segment>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Fragment>
  );
};
export default Step1;
