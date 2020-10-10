import React from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const RTTemplates = () => {
  const {
    templateOptions,
    updateSelectedTemplateOption,
  } = useSequencePredictions();

  return (
    <SequenceOptionsDropDown
      title="RT templates:"
      options={templateOptions.map((option) => option.rt)}
      onChange={updateSelectedTemplateOption}
    />
  );
};

export default RTTemplates;
