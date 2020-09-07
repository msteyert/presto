import React from 'react';
import { Grid } from 'semantic-ui-react';
import OutputTabs from './OutputTabs';
import SequenceViewer from './SequenceViewer';

const Step2 = () => {
  return (
    <Grid.Row>
      <OutputTabs />
      <Grid.Column width={9}>
        <SequenceViewer />
      </Grid.Column>
    </Grid.Row>
  );
};

export default Step2;
