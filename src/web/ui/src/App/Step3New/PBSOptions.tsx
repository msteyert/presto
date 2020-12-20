import React, { Fragment } from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions } from '../../hooks';

const PBSOptions = () => {
  const { pbsOptions, updateSelectedPbsOption } = useSequencePredictions();
  return (
    <Fragment>
      {pbsOptions.length > 0 && (
        <SequenceOptionsDropDown
          title="Primer binding sites:"
          options={pbsOptions.map((option) => option.pbs)}
          onChange={updateSelectedPbsOption}
        />
      )}
    </Fragment>
  );
};

export default PBSOptions;
