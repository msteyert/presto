import React from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const PBSOptions = () => {
  const { pbsOptions } = useSequencePredictions();
  return (
    <SequenceOptionsDropDown
      title="Primer binding sites:"
      options={pbsOptions.map((option) => option.pbs)}
    />
  );
};

export default PBSOptions;
