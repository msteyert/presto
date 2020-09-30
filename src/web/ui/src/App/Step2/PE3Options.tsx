import React from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const PE3Options = () => {
  const { pe3Options } = useSequencePredictions();
  return (
    <SequenceOptionsDropDown
      title="PE3 Guides:"
      options={pe3Options.map((option) => option.secondGuide)}
    />
  );
};

export default PE3Options;
