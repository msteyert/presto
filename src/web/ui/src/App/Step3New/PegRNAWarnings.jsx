import React, { Fragment } from 'react';
import { Message, MessageHeader } from 'semantic-ui-react';
import { useSequencePredictions } from '../../hooks';

const PegRNAWarnings = () => {
  const {
    warnings: { general, pegRna },
  } = useSequencePredictions();
  const warnings = [...general, ...pegRna];

  return (
    <Fragment>
      {warnings.length > 0 && (
        <Message warning>
          <MessageHeader>Warning!</MessageHeader>
          {warnings.map((warning, i) => (
            <p key={`warning-${i}`}>{warning}</p>
          ))}
        </Message>
      )}
    </Fragment>
  );
};

export default PegRNAWarnings;
