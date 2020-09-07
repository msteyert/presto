import React from 'react';
import SequenceOptions from '../../components/SequenceOptions';
import { useSequencePredictions } from '../../hooks';

const RTTemplates = () => {
  const { templateOptions } = useSequencePredictions();
  return (
    <SequenceOptions
      title="RT templates:"
      options={templateOptions.map((option) => option.rt)}
    />
  );
};

export default RTTemplates;
