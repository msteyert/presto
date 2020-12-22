import React, { Fragment } from 'react';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions, useStep3Advanced } from '../../hooks';
import { PBSOption } from '../../types/presto';
import Statistic from './Statistic';

const onChangeFactory = (
  updateSelectedPbsOption: (option: PBSOption) => void,
  PbsOptions: PBSOption[],
) => (value: string) => {
  updateSelectedPbsOption(
    PbsOptions.find((p) => p.pbs === value) || PbsOptions[0],
  );
};

const PBSOptions = () => {
  const {
    pbsOptions,
    updateSelectedPbsOption,
    selectedPbsOption,
  } = useSequencePredictions();
  const { step3Advanced } = useStep3Advanced();
  return (
    <Fragment>
      {pbsOptions.length > 0 && (
        <SequenceOptionsDropDown
          title="Primer binding sites:"
          options={pbsOptions.map((option) => option.pbs)}
          onChange={onChangeFactory(updateSelectedPbsOption, pbsOptions)}
        />
      )}
      {selectedPbsOption && step3Advanced && (
        <Fragment>
          <div style={{ height: 15 }} />
          <div>
            {[
              { label: 'length', value: selectedPbsOption.length },
              { label: 'pbsGC', value: selectedPbsOption.pbsGC },
              {
                label: 'pbsPolyT',
                value: selectedPbsOption.pbsPolyT,
              },
              { label: 'pbsTM', value: selectedPbsOption.pbsTM },
            ].map((o) => (
              <Statistic label={o.label} value={o.value} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PBSOptions;
