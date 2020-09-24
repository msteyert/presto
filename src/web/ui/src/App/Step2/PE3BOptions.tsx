import React from 'react';
import SequenceOptions from '../../components/SequenceOptions';
import { useSequencePredictions } from '../../hooks';

const PE3BOptions = () => {
  const { pe3bOptions } = useSequencePredictions();
  return (
    <SequenceOptions
      title="PE3b Guides:"
      options={pe3bOptions.map((option) => option.secondGuide)}
    />
  );
};

export default PE3BOptions;
