import React from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const RTTemplates = () => {
  const { templateOptions } = useSequencePredictions();
  return (
    <SequenceOptionsDropDown
      title="RT templates:"
      options={templateOptions.map((option) => option.rt)}
    />
  );
};

export default RTTemplates;
