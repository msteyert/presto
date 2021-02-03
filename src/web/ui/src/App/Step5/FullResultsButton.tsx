import React from 'react';
import { Button } from 'semantic-ui-react';
import { generateCSV, trackEvent } from '../../api';
import events from '../../api/events';
import { useSequencePredictions } from '../../hooks';

const FullResultsButton = () => {
  const {
    wtSeq,
    mut,
    spacer,
    pam,
    minPbs,
    maxPbs,
    minRt,
    maxRt,
  } = useSequencePredictions();
  const handleClick = () =>
    generateCSV(wtSeq, mut, spacer, pam, minPbs, maxPbs, minRt, maxRt);
  trackEvent(events.step5.submit);
  return (
    <Button onClick={handleClick} primary>
      Download Full Results
    </Button>
  );
};

export default FullResultsButton;
