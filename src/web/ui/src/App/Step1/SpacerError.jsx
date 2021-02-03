import React, { Fragment } from 'react';
import { Message, MessageHeader } from 'semantic-ui-react';
import { useSpacerError } from '../../hooks';

const SpacerError = () => {
  const { spacerError } = useSpacerError();

  return (
    <Fragment>
      {spacerError && (
        <Message warning>
          <MessageHeader>Error!</MessageHeader>
          Looks like we couldn't predict any spacers for your sequence. You can
          set a custom spacer in the advanced options
        </Message>
      )}
    </Fragment>
  );
};

export default SpacerError;
