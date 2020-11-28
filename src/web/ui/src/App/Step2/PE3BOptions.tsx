import React, { Fragment } from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const PE3BOptions = () => {
  const { pe3bOptions, updateSelectedPe3bOption } = useSequencePredictions();
  return (
    <Fragment>
      {pe3bOptions.length > 0 && (
        <SequenceOptionsDropDown
          title="PE3b Guides:"
          options={pe3bOptions.map((option) => option.secondGuide)}
          onChange={updateSelectedPe3bOption}
        />
      )}
    </Fragment>
  );
};

export default PE3BOptions;
