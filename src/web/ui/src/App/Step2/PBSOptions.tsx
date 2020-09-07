import React from 'react';
import SequenceOptions from '../../components/SequenceOptions';
import { useSequencePredictions } from '../../hooks';

const PBSOptions = () => {
  const { pbsOptions } = useSequencePredictions();
  return (
    <SequenceOptions
      title="Primer binding sites:"
      options={pbsOptions.map((option) => option.pbs)}
    />
  );
};

export default PBSOptions;
