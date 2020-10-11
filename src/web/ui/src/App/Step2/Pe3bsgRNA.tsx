import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import Copy from '../../components/Copy';
import { usePe3bsgRNA } from '../../hooks';

const Pe3bsgRNA = () => {
  const { pe3bsgRNA } = usePe3bsgRNA();

  return (
    <Fragment>
      <Grid.Column width={8}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            sense sgRNA:
            <Copy value={pe3bsgRNA.sense} />
          </div>
          <p style={{ wordBreak: 'break-word' }}>{pe3bsgRNA.sense}</p>
        </div>
      </Grid.Column>
      <Grid.Column width={8}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            antisense sgRNA:
            <Copy value={pe3bsgRNA.antisense} />
          </div>
          <p style={{ wordBreak: 'break-word' }}>{pe3bsgRNA.antisense}</p>
        </div>
      </Grid.Column>
    </Fragment>
  );
};

export default Pe3bsgRNA;
