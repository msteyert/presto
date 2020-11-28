import React, { Fragment } from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const PE3Options = () => {
  const { pe3Options, updateSelectedPe3Option } = useSequencePredictions();
  return (
    <Fragment>
      {pe3Options.length > 0 && (
        <SequenceOptionsDropDown
          title="PE3 Guides:"
          options={pe3Options.map((option) => option.secondGuide)}
          onChange={updateSelectedPe3Option}
        />
      )}
    </Fragment>
  );
};

export default PE3Options;
