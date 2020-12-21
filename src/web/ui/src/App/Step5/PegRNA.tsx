import React, { Fragment } from 'react';
import Copy from '../../components/Copy';
import { usePegRNA } from '../../hooks';
import { SeqViz } from 'seqviz';
import { FinalPegRNAAnnotation } from '../../types/presto';

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

const PegRNA = () => {
  const { pegRNA } = usePegRNA();
  const annotations = uniqBy(
    pegRNA?.annotations || ([] as FinalPegRNAAnnotation[]),
    (a: FinalPegRNAAnnotation) => a.name,
  );

  return (
    <Fragment>
      {pegRNA && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              Final pegRNA:
              <Copy value={pegRNA.sequence} />
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
              {pegRNA.annotations.map((annotation) => (
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
