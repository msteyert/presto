import React, { Fragment } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import Submit from './Submit';

const Step1 = () => (
  <Fragment>
    <div style={{ height: 40 }}></div>
    <Grid.Row>
      <Grid.Column width={14}>
        <Segment>
          <h2>Start</h2>
          <Submit />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Fragment>
);
export default Step1;
