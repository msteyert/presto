import React, { Fragment } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import OutputTabs from './OutputTabs';
import FullResultsButton from './FullResultsButton';

const Step2 = () => {
  return (
    <Fragment>
      <Grid.Row>
        <Grid.Column width={14}>
          <div id="step-3-container">
            <Segment>
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
