import React from 'react';
import { Button } from 'semantic-ui-react';
import { generateCSV } from '../../api';
import { useSequencePredictions } from '../../hooks';

const FullResultsButton = () => {
  const { wtSeq, mut, spacer } = useSequencePredictions();
  const handleClick = () => generateCSV(wtSeq, mut, spacer);
  return (
    <Button onClick={handleClick} primary>
      Donwnload Full Results
    </Button>
  );
};

export default FullResultsButton;
