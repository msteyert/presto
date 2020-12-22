import React, { Fragment } from 'react';
import Copy from '../../components/Copy';
import { usePe3sgRNA, useSequencePredictions } from '../../hooks';

const Pe3sgRNA = () => {
  const { pe3Options } = useSequencePredictions();
  const { pe3sgRNA } = usePe3sgRNA();

  return (
    <div>
      {pe3Options.length > 0 && (
        <Fragment>
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                sense PE3 guide:
                <Copy value={pe3sgRNA.sense} />
              </div>
              <p style={{ wordBreak: 'break-word' }}>{pe3sgRNA.sense}</p>
            </div>
          </div>
          <div style={{ height: 15 }} />
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                antisense PE3 guide:
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
