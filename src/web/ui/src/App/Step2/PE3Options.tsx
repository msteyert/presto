import React from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const PE3Options = () => {
  const { pe3Options, updateSelectedPe3Option } = useSequencePredictions();
  return (
    <SequenceOptionsDropDown
      title="PE3 Guides:"
      options={pe3Options.map((option) => option.secondGuide)}
      onChange={updateSelectedPe3Option}
    />
  );
};

export default PE3Options;
