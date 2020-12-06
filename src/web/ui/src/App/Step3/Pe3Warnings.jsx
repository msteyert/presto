import React, { Fragment } from 'react';
import { Message, MessageHeader } from 'semantic-ui-react';
import { useSequencePredictions } from '../../hooks';

const Pe3Warnings = () => {
  const {
    warnings: { general, pe3 },
  } = useSequencePredictions();
  const warnings = [...general, ...pe3];

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

export default Pe3Warnings;
