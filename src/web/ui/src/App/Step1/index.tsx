import React from 'react';
import { Grid } from 'semantic-ui-react';
import Submit from './Submit';

type Props = {
  onSubmit: (wtSeq: string, mut: string, spacer: string) => Promise<void>;
};

const Step1 = () => (
  <Grid.Row>
    <Grid.Column width={14}>
      <Submit />
    </Grid.Column>
  </Grid.Row>
);
export default Step1;
