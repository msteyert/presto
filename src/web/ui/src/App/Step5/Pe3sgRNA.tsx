import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import Copy from '../../components/Copy';
import { usePe3sgRNA, useSequencePredictions } from '../../hooks';

const Pe3sgRNA = () => {
  const { pe3Options } = useSequencePredictions();
  const { pe3sgRNA } = usePe3sgRNA();

  return (
    <div style={{ display: 'flex' }}>
      {pe3Options.length > 0 && (
        <Fragment>
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                sense sgRNA:
                <Copy value={pe3sgRNA.sense} />
              </div>
              <p style={{ wordBreak: 'break-word' }}>{pe3sgRNA.sense}</p>
            </div>
          </div>
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                antisense sgRNA:
                <Copy value={pe3sgRNA.antisense} />
              </div>
              <p style={{ wordBreak: 'break-word' }}>{pe3sgRNA.antisense}</p>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Pe3sgRNA;
