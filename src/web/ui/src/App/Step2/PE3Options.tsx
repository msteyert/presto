import React from 'react';
import SequenceOptions from '../../components/SequenceOptions';
import { useSequencePredictions } from '../../hooks';

const PE3Options = () => {
  const { pe3Options } = useSequencePredictions();
  return (
    <SequenceOptions
      title="PE3 Guides:"
      options={pe3Options.map((option) => option.secondGuide)}
    />
  );
};

export default PE3Options;
