import React, { Fragment } from 'react';
import Copy from '../../components/Copy';
import { useSequencePredictions, useCloningStrategy } from '../../hooks';

const SpacersgRNA = () => {
  const { spacersgRNA, pe3Options } = useSequencePredictions();
  const { cloningStrategy } = useCloningStrategy();

  return (
    <div>
      {pe3Options.length > 0 && (
        <Fragment>
          <div style={{ flexGrow: 1 }}>
            <div className="field-group">
              <div>
                <span className="field-label">
                  Spacer {cloningStrategy !== 'None' ? 'sense' : ''}:
                </span>
                <Copy value={spacersgRNA.sense} />
              </div>
              <p>
                <span className="spacer-output-sequence">
                  {spacersgRNA.sense}
                </span>
              </p>
            </div>
          </div>
          {cloningStrategy !== 'None' && (
            <div style={{ flexGrow: 1 }}>
              <div className="field-group">
                <div>
                  <span className="field-label">Spacer antisense:</span>
                  <Copy value={spacersgRNA.antisense} />
                </div>
                <p>
                  <span className="spacer-output-sequence">
                    {spacersgRNA.antisense}
                  </span>
                </p>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default SpacersgRNA;
