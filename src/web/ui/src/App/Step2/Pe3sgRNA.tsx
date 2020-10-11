import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import Copy from '../../components/Copy';
import { usePe3sgRNA } from '../../hooks';

const Pe3sgRNA = () => {
  const { pe3sgRNA } = usePe3sgRNA();

  return (
    <Fragment>
      <Grid.Column width={8}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            sense sgRNA:
            <Copy value={pe3sgRNA.sense} />
          </div>
          <p style={{ wordBreak: 'break-word' }}>{pe3sgRNA.sense}</p>
        </div>
      </Grid.Column>
      <Grid.Column width={8}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            antisense sgRNA:
            <Copy value={pe3sgRNA.antisense} />
          </div>
          <p style={{ wordBreak: 'break-word' }}>{pe3sgRNA.antisense}</p>
        </div>
      </Grid.Column>
    </Fragment>
  );
};

export default Pe3sgRNA;
