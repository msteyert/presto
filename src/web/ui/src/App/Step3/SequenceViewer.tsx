import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { SeqViz } from 'seqviz';
import { useCleanWtSeq, useCleanMutSeq } from '../../hooks';

const SequenceViewer = () => {
  const { cleanWtSeq } = useCleanWtSeq();
  const { cleanMutSeq } = useCleanMutSeq();
  return (
    <Segment>
      <Grid.Row>
        <p>Wildtype sequence</p>
        <div style={{ height: '120px', width: '100%' }}>
          <SeqViz
            name="J23100"
            seq={cleanWtSeq}
            viewer="linear"
            zoom={{
              linear: 30,
            }}
          />
        </div>
      </Grid.Row>
      <Grid.Row>
        <p>Mutant sequence</p>
        <div style={{ height: '120px', width: '100%' }}>
          <SeqViz
            name="J23100"
            seq={cleanMutSeq}
            viewer="linear"
            zoom={{
              linear: 30,
            }}
          />
        </div>
      </Grid.Row>
    </Segment>
  );
};

export default SequenceViewer;
