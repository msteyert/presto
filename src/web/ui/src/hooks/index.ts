import {
  generateTemplateOptions,
  generateCleanWtSeq,
  generateMutSeq,
  generatePrimerBindingSiteOptions,
  generatePe3Options,
  generatePegRNA,
  generateSgRNA,
} from '../api';
import { GlobalState, PE3Option } from '../types/presto';
import { createGlobalState } from 'react-hooks-global-state';

const initialState: GlobalState = {
  spacer: '',
  templateOptions: [],
  selectedTemplateOption: null,
  pbsOptions: [],
  selectedPbsOption: null,
  pe3bOptions: [],
  pe3Options: [],
  selectedPe3Option: null,
  cleanWtSeq: '',
  cleanMutSeq: '',
  step: 0,
  pegRNA: '',
  sgRNA: '',
};

const { useGlobalState, getGlobalState } = createGlobalState(initialState);

export function useSequencePredictions() {
  const [templateOptions, setTemplateOptions] = useGlobalState(
    'templateOptions',
  );

  const [spacer, setSpacer] = useGlobalState('spacer');
  const [pbsOptions, setPBSOptions] = useGlobalState('pbsOptions');
  const [pe3bOptions, setPe3bOptions] = useGlobalState('pe3bOptions');
  const [pe3Options, setPe3Options] = useGlobalState('pe3Options');
  const [pegRNA, setPegRNA] = useGlobalState('pegRNA');
  const [sgRNA, setSgRNA] = useGlobalState('sgRNA');
  const [selectedTemplateOption, setSelectedTemplateOption] = useGlobalState(
    'selectedTemplateOption',
  );
  const [selectedPbsOption, setSelectedPbsOption] = useGlobalState(
    'selectedPbsOption',
  );
  const [selectedPe3Option, setSelectedPe3Option] = useGlobalState(
    'selectedPe3Option',
  );

  async function updateSequencePredictions(
    wtSeq: string,
    mut: string,
    spacer: string,
  ) {
    setTemplateOptions(await generateTemplateOptions(wtSeq, mut, spacer));
    if (getGlobalState('templateOptions').length > 0) {
      setSelectedTemplateOption(getGlobalState('templateOptions')[0].rt);
    }
    setPBSOptions(await generatePrimerBindingSiteOptions(wtSeq, mut, spacer));
    if (getGlobalState('pbsOptions').length > 0) {
      setSelectedPbsOption(getGlobalState('pbsOptions')[0].pbs);
    }
    const pe3Options: PE3Option[] = await generatePe3Options(
      wtSeq,
      mut,
      spacer,
    );
    setPe3bOptions(pe3Options.filter((option) => option.type === 'pe3b'));
    if (getGlobalState('pe3bOptions').length > 0) {
      setSelectedPe3Option(getGlobalState('pe3bOptions')[0].secondGuide);
    }
    setPe3Options(pe3Options.filter((option) => option.type === 'pe3'));
    if (getGlobalState('pe3Options').length > 0) {
      setSelectedPe3Option(getGlobalState('pe3Options')[0].secondGuide);
    }

    updatePegRNA();
  }

  async function updatePegRNA() {
    const globalSpacer = getGlobalState('spacer');
    const globalSelectedTemplateOption = getGlobalState(
      'selectedTemplateOption',
    );
    const globalSelectedPbsOption = getGlobalState('selectedPbsOption');
    console.log('update');
    console.log(globalSelectedTemplateOption);
    console.log(globalSelectedPbsOption);
    if (globalSelectedTemplateOption && globalSelectedPbsOption) {
      console.log('inner');
      const { sequence } = await generatePegRNA(
        globalSpacer,
        globalSelectedTemplateOption,
        globalSelectedPbsOption,
      );
      setPegRNA(sequence);
    }
  }

  function updateSelectedTemplateOption(option: string) {
    setSelectedTemplateOption(option);
    updatePegRNA();
  }

  function updateSelectedPbsOption(option: string) {
    setSelectedPbsOption(option);
    updatePegRNA();
  }

  async function updateSgRNA() {
    if (selectedPe3Option) {
      const { sequence } = await generateSgRNA(selectedPe3Option);
      setSgRNA(sequence);
    }
  }

  return {
    spacer,
    templateOptions,
    pbsOptions,
    pe3bOptions,
    pe3Options,
    pegRNA,
    sgRNA,
    setSpacer,
    selectedTemplateOption,
    updateSelectedTemplateOption,
    updateSelectedPbsOption,
    setSelectedPe3Option,
    updateSequencePredictions,
    updatePegRNA,
    updateSgRNA,
  };
}

export function useCleanWtSeq() {
  const [cleanWtSeq, setCleanWtSeq] = useGlobalState('cleanWtSeq');
  async function getCleanWtSeq(wtSeq: string, mut: string, spacer: string) {
    const { sequence } = await generateCleanWtSeq(wtSeq, mut, spacer);
    setCleanWtSeq(sequence);
  }
  return {
    cleanWtSeq,
    getCleanWtSeq,
  };
}
export function useCleanMutSeq() {
  const [cleanMutSeq, setCleanMutSeq] = useGlobalState('cleanMutSeq');
  async function getCleanMutSeq(wtSeq: string, mut: string, spacer: string) {
    const { sequence } = await generateMutSeq(wtSeq, mut, spacer);
    setCleanMutSeq(sequence);
  }
  return {
    cleanMutSeq,
    getCleanMutSeq,
  };
}

export function usePegRNA() {
  const [pegRNA, setPegRNA] = useGlobalState('pegRNA');

  return {
    pegRNA,
    setPegRNA,
  };
}

export function useStep() {
  const [step, setStep] = useGlobalState('step');
  return {
    step,
    setStep,
  };
}
