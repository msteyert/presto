import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Submit from './Submit';

const Step1 = () => (
  <Grid.Row>
    <Grid.Column width={14}>
      <div id="step-2-container">
        <Segment>
          <h2>Spacer</h2>
          <Submit />
        </Segment>
      </div>
    </Grid.Column>
  </Grid.Row>
);
export default Step1;
