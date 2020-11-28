import React, { Fragment } from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const RTTemplates = () => {
  const {
    templateOptions,
    updateSelectedTemplateOption,
  } = useSequencePredictions();

  return (
    <Fragment>
      {templateOptions.length > 0 && (
        <SequenceOptionsDropDown
          title="RT templates:"
          options={templateOptions.map((option) => option.rt)}
          onChange={updateSelectedTemplateOption}
        />
      )}
    </Fragment>
  );
};

export default RTTemplates;
