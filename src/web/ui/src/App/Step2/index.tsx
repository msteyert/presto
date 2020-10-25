import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import OutputTabs from './OutputTabs';
import FullResultsButton from './FullResultsButton';

const Step2 = () => {
  return (
    <Fragment>
      <Grid.Row>
        <Grid.Column width={14}>
          <OutputTabs />
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
