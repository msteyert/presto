import React, { Fragment } from 'react';
import Statistic from './Statistic';
import SequenceOptionsDropDown from '../../components/SequenceOptionsDropDown';
import { useSequencePredictions, useStep3Advanced } from '../../hooks';
import { TemplateOption } from '../../types/presto';

const onChangeFactory = (
  updateSelectedTemplateOption: (option: TemplateOption) => void,
  templateOptions: TemplateOption[],
) => (value: string) => {
  updateSelectedTemplateOption(
    templateOptions.find((t) => t.rt === value) || templateOptions[0],
  );
};

const RTTemplates = () => {
  const {
    templateOptions,
    updateSelectedTemplateOption,
    selectedTemplateOption,
  } = useSequencePredictions();
  const { step3Advanced } = useStep3Advanced();

  return (
    <Fragment>
      {templateOptions.length > 0 && (
        <Fragment>
          <SequenceOptionsDropDown
            title="RT templates:"
            options={templateOptions.map((option) => option.rt)}
            onChange={onChangeFactory(
              updateSelectedTemplateOption,
              templateOptions,
            )}
          />
          {selectedTemplateOption && step3Advanced && (
            <Fragment>
              <div style={{ height: 15 }} />
              <div>
                {[
                  { label: 'fhr', value: selectedTemplateOption.fhr },
                  { label: 'fhrGC', value: selectedTemplateOption.fhrGC },
                  {
                    label: 'fhrLength',
                    value: selectedTemplateOption.fhrLength,
                  },
                  { label: 'rtLength', value: selectedTemplateOption.rtLength },
                  { label: 'rtPolyT', value: selectedTemplateOption.rtPolyT },
                  { label: 'rtTM', value: selectedTemplateOption.rtTM },
                ].map((o) => (
                  <Statistic label={o.label} value={o.value} />
                ))}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default RTTemplates;

// error: string;
// fhr: string;
// fhrGC: number;
// fhrLength: number;
// isDefault: boolean;
// rt: string;
// rtLength: number;
// rtPolyT: boolean;
// rtTM: number;
// startsWithC: boolean;
