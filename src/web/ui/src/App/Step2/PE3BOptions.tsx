import React from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const PE3BOptions = () => {
  const { pe3bOptions, updateSelectedPe3bOption } = useSequencePredictions();
  return (
    <SequenceOptionsDropDown
      title="PE3b Guides:"
      options={pe3bOptions.map((option) => option.secondGuide)}
      onChange={updateSelectedPe3bOption}
    />
  );
};

export default PE3BOptions;
