import React, { Fragment } from 'react';
import Copy from '../../components/Copy';
import { useCloningStrategy, usePegRNA } from '../../hooks';
import { FinalPegRNAAnnotation } from '../../types/presto';
import CloningStrategyDropdown from './CloningStrategyDropdown';

function uniqBy(
  a: Array<FinalPegRNAAnnotation>,
  key: (o: FinalPegRNAAnnotation) => any,
) {
  let seen = new Set();
  return a.filter((item) => {
    let k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
}

const getSequence = (annotations: FinalPegRNAAnnotation[]) =>
  annotations.map((a) => a.sequence).join('');

const getCloningStrategyAnnotations = (
  annotations: FinalPegRNAAnnotation[],
  cloningStrategy: string,
) =>
  annotations.filter((a) =>
    cloningStrategy === 'None'
      ? ['rtt', 'pbs', 'spacer', 'cas9_scaffold'].includes(a.name)
      : true,
  );

const PegRNA = () => {
  const { pegRNA } = usePegRNA();
  const { cloningStrategy } = useCloningStrategy();
  const annotations = uniqBy(
    getCloningStrategyAnnotations(
      pegRNA?.annotations || ([] as FinalPegRNAAnnotation[]),
      cloningStrategy,
    ),
    (a: FinalPegRNAAnnotation) => a.name,
  );

  return (
    <Fragment>
      <CloningStrategyDropdown />
      {pegRNA && (
        <div style={{ marginTop: 30 }}>
          <div className="field-group">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <span className="field-label">Final pegRNA:</span>
              <Copy
                value={getSequence(
                  getCloningStrategyAnnotations(
                    pegRNA.annotations,
                    cloningStrategy,
                  ),
                )}
              />
              <div style={{ display: 'flex', position: 'absolute', right: 12 }}>
                {annotations.map((annotation) => (
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        width: 19,
                        height: 19,
                        backgroundColor: annotation.color,
                        borderRadius: 5,
                      }}
                    ></div>
                    <span style={{ marginLeft: 2, marginRight: 10 }}>
                      {annotation.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ wordBreak: 'break-word', marginTop: 10 }}>
              {getCloningStrategyAnnotations(
                pegRNA.annotations,
                cloningStrategy,
              ).map((annotation) => (
                <span
                  style={{
                    backgroundColor: annotation.color,
                    padding: '0 5px',
                    borderRadius: 5,
                  }}
                >
                  {annotation.sequence}
                </span>
              ))}
            </p>
          </div>
          {/* <SeqViz
            name="pegRNA"
            seq={pegRNA.sequence}
            viewer="circular"
            annotations={annotations}
            showComplement={false}
            style={{ height: '300px', width: '100%' }}
            zoom={{
              linear: 50,
            }}
          /> */}
        </div>
      )}
    </Fragment>
  );
};

export default PegRNA;
