import React, { Fragment } from 'react';
import Copy from '../../components/Copy';
import {
  usePe3sgRNA,
  useSequencePredictions,
  useCloningStrategy,
} from '../../hooks';

const Pe3sgRNA = () => {
  const { pe3Options } = useSequencePredictions();
  const { pe3sgRNA } = usePe3sgRNA();
  const { selectedPe3Option } = useSequencePredictions();
  const { cloningStrategy } = useCloningStrategy();

  return (
    <div>
      {pe3Options.length > 0 && selectedPe3Option?.secondGuide !== 'None' && (
        <Fragment>
          <div style={{ flexGrow: 1 }}>
            <div className="field-group">
              <div>
                <span className="field-label">
                  PE3 {cloningStrategy !== 'None' ? 'sense' : ''}:
                </span>
                <Copy
                  value={
                    cloningStrategy !== 'None'
                      ? pe3sgRNA.sense
                      : selectedPe3Option?.secondGuide
                  }
                />
              </div>
              <p>
                <span className="generic-output-sequence">
                  {cloningStrategy !== 'None'
                    ? pe3sgRNA.sense
                    : selectedPe3Option?.secondGuide}
                </span>
              </p>
            </div>
          </div>
          {cloningStrategy !== 'None' && (
            <div style={{ flexGrow: 1 }}>
              <div className="field-group">
                <div>
                  <span className="field-label">PE3 antisense:</span>
                  <Copy value={pe3sgRNA.antisense} />
                </div>
                <p>
                  <span className="generic-output-sequence">
                    {pe3sgRNA.antisense}
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

export default Pe3sgRNA;
