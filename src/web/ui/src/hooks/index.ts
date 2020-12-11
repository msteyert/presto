import {
  generateTemplateOptions,
  generateCleanWtSeq,
  generateMutSeq,
  generatePrimerBindingSiteOptions,
  generatePe3Options,
  generatePegRNA,
  generateSgRNA,
  generateWarnings,
} from '../api';
import { GlobalState, PE3Option } from '../types/presto';
import { createGlobalState } from 'react-hooks-global-state';

const initialState: GlobalState = {
  wtSeq: '',
  mut: '',
  spacer: '',
  customSpacer: '',
  pam: 'NGG',
  minPbs: 8,
  maxPbs: 18,
  minRt: 9,
  maxRt: 16,
  templateOptions: [],
  selectedTemplateOption: null,
  spacerOptions: [],
  selectedSpacerOption: null,
  pbsOptions: [],
  selectedPbsOption: null,
  pe3bOptions: [],
  pe3Options: [],
  selectedPe3Option: null,
  selectedPe3bOption: null,
  cleanWtSeq: '',
  cleanMutSeq: '',
  step: 0,
  pegRNA: '',
  pe3sgRNA: { sense: '', antisense: '' },
  pe3bsgRNA: { sense: '', antisense: '' },
  warnings: {
    general: [],
    pegRna: [],
    pe3: [],
  },
  step2Loading: false,
  step3Loading: false,
};

const { useGlobalState, getGlobalState } = createGlobalState(initialState);

export function useSequencePredictions() {
  const [templateOptions, setTemplateOptions] = useGlobalState(
    'templateOptions',
  );

  const [wtSeq, setWtSeq] = useGlobalState('wtSeq');
  const [mut, setMut] = useGlobalState('mut');
  const [spacer, setSpacer] = useGlobalState('spacer');

  const [pam, setPam] = useGlobalState('pam');
  const [minPbs, setMinPbs] = useGlobalState('minPbs');
  const [maxPbs, setMaxPbs] = useGlobalState('maxPbs');
  const [minRt, setMinRt] = useGlobalState('minRt');
  const [maxRt, setMaxRt] = useGlobalState('maxRt');

  const [pbsOptions, setPBSOptions] = useGlobalState('pbsOptions');
  const [pe3bOptions, setPe3bOptions] = useGlobalState('pe3bOptions');
  const [pe3Options, setPe3Options] = useGlobalState('pe3Options');
  const [pegRNA, setPegRNA] = useGlobalState('pegRNA');
  const [pe3sgRNA, setPe3sgRNA] = useGlobalState('pe3sgRNA');
  const [pe3bsgRNA, setPe3bsgRNA] = useGlobalState('pe3bsgRNA');
  const [selectedSpacerOption, setSelectedSpacerOption] = useGlobalState(
    'selectedSpacerOption',
  );
  const [selectedTemplateOption, setSelectedTemplateOption] = useGlobalState(
    'selectedTemplateOption',
  );
  const [selectedPbsOption, setSelectedPbsOption] = useGlobalState(
    'selectedPbsOption',
  );
  const [selectedPe3Option, setSelectedPe3Option] = useGlobalState(
    'selectedPe3Option',
  );
  const [selectedPe3bOption, setSelectedPe3bOption] = useGlobalState(
    'selectedPe3bOption',
  );
  const [warnings, setWarnings] = useGlobalState('warnings');

  async function updateSequencePredictions(
    wtSeq: string,
    mut: string,
    spacer: string,
    pam: string,
    minPbs: number,
    maxPbs: number,
    minRt: number,
    maxRt: number,
  ) {
    setTemplateOptions(
      await generateTemplateOptions(
        wtSeq.toUpperCase(),
        mut.toUpperCase(),
        spacer.toUpperCase(),
        pam.toUpperCase(),
        minPbs,
        maxPbs,
        minRt,
        maxRt,
      ),
    );

    setWarnings(
      await generateWarnings(
        wtSeq.toUpperCase(),
        mut.toUpperCase(),
        spacer.toUpperCase(),
        pam.toUpperCase(),
        minPbs,
        maxPbs,
        minRt,
        maxRt,
      ),
    );

    setWtSeq(wtSeq.toUpperCase());
    setMut(mut.toUpperCase());
    setSpacer(spacer.toUpperCase());

    setPam(pam.toUpperCase());
    setMinPbs(minPbs);
    setMaxPbs(maxPbs);
    setMinRt(minRt);
    setMaxRt(maxRt);

    if (getGlobalState('templateOptions').length > 0) {
      setSelectedTemplateOption(getGlobalState('templateOptions')[0].rt);
    }
    setPBSOptions(
      await generatePrimerBindingSiteOptions(
        wtSeq.toUpperCase(),
        mut.toUpperCase(),
        spacer.toUpperCase(),
        pam.toUpperCase(),
        minPbs,
        maxPbs,
        minRt,
        maxRt,
      ),
    );
    if (getGlobalState('pbsOptions').length > 0) {
      setSelectedPbsOption(getGlobalState('pbsOptions')[0].pbs);
    }
    const pe3Options: PE3Option[] = await generatePe3Options(
      wtSeq.toUpperCase(),
      mut.toUpperCase(),
      spacer.toUpperCase(),
      pam.toUpperCase(),
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    );
    setPe3bOptions(pe3Options.filter((option) => option.type === 'pe3b'));
    if (getGlobalState('pe3bOptions').length > 0) {
      setSelectedPe3bOption(getGlobalState('pe3bOptions')[0].secondGuide);
    }
    setPe3Options(pe3Options.filter((option) => option.type === 'pe3'));
    if (getGlobalState('pe3Options').length > 0) {
      setSelectedPe3Option(getGlobalState('pe3Options')[0].secondGuide);
    }

    updatePegRNA();
    updateSgRNA();
  }

  async function updatePegRNA() {
    const globalSpacer = getGlobalState('spacer');
    const globalSelectedTemplateOption = getGlobalState(
      'selectedTemplateOption',
    );
    const globalSelectedPbsOption = getGlobalState('selectedPbsOption');
    if (globalSelectedTemplateOption && globalSelectedPbsOption) {
      const { sequence } = await generatePegRNA(
        globalSpacer.toUpperCase(),
        globalSelectedTemplateOption.toUpperCase(),
        globalSelectedPbsOption.toUpperCase(),
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

  function updateSelectedPe3Option(option: string) {
    setSelectedPe3Option(option);
    updateSgRNA();
  }
  function updateSelectedPe3bOption(option: string) {
    setSelectedPe3bOption(option);
    updateSgRNA();
  }

  async function updateSgRNA() {
    const globalSelectedPe3Option = getGlobalState('selectedPe3Option');
    const globalSelectedPe3bOption = getGlobalState('selectedPe3bOption');
    if (globalSelectedPe3Option) {
      const sgRNA = await generateSgRNA(globalSelectedPe3Option.toUpperCase());
      setPe3sgRNA(sgRNA);
    }
    if (globalSelectedPe3bOption) {
      const sgRNA = await generateSgRNA(globalSelectedPe3bOption.toUpperCase());
      setPe3bsgRNA(sgRNA);
    }
  }

  return {
    wtSeq,
    mut,
    spacer,
    pam,
    minPbs,
    maxPbs,
    minRt,
    maxRt,
    templateOptions,
    pbsOptions,
    pe3bOptions,
    pe3Options,
    pegRNA,
    pe3sgRNA,
    pe3bsgRNA,
    warnings,
    setSpacer,
    selectedTemplateOption,
    updateSelectedTemplateOption,
    updateSelectedPbsOption,
    updateSelectedPe3Option,
    updateSelectedPe3bOption,
    updateSequencePredictions,
    updatePegRNA,
    updateSgRNA,
    selectedSpacerOption,
    setSelectedSpacerOption,
  };
}

export function useCleanWtSeq() {
  const [cleanWtSeq, setCleanWtSeq] = useGlobalState('cleanWtSeq');
  async function getCleanWtSeq(
    wtSeq: string,
    mut: string,
    spacer: string,
    pam: string,
    minPbs: number,
    maxPbs: number,
    minRt: number,
    maxRt: number,
  ) {
    const { sequence } = await generateCleanWtSeq(
      wtSeq.toUpperCase(),
      mut.toUpperCase(),
      spacer.toUpperCase(),
      pam.toUpperCase(),
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    );
    setCleanWtSeq(sequence);
  }
  return {
    cleanWtSeq,
    getCleanWtSeq,
  };
}
export function useCleanMutSeq() {
  const [cleanMutSeq, setCleanMutSeq] = useGlobalState('cleanMutSeq');
  async function getCleanMutSeq(
    wtSeq: string,
    mut: string,
    spacer: string,
    pam: string,
    minPbs: number,
    maxPbs: number,
    minRt: number,
    maxRt: number,
  ) {
    const { sequence } = await generateMutSeq(
      wtSeq.toUpperCase(),
      mut.toUpperCase(),
      spacer.toUpperCase(),
      pam.toUpperCase(),
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    );
    setCleanMutSeq(sequence);
  }
  return {
    cleanMutSeq,
    getCleanMutSeq,
  };
}

export function useWtSeq() {
  const [wtSeq, setWtSeq] = useGlobalState('wtSeq');

  return {
    wtSeq,
    setWtSeq,
  };
}

export function useMut() {
  const [mut, setMut] = useGlobalState('mut');

  return {
    mut,
    setMut,
  };
}

export function useCustomSpacer() {
  const [customSpacer, setCustomSpacer] = useGlobalState('customSpacer');

  return {
    customSpacer,
    setCustomSpacer,
  };
}

export function usePam() {
  const [pam, setPam] = useGlobalState('pam');

  return {
    pam,
    setPam,
  };
}

export function useMinPbs() {
  const [minPbs, setMinPbs] = useGlobalState('minPbs');

  return {
    minPbs,
    setMinPbs,
  };
}

export function useMaxPbs() {
  const [maxPbs, setMaxPbs] = useGlobalState('maxPbs');

  return {
    maxPbs,
    setMaxPbs,
  };
}

export function useMinRt() {
  const [minRt, setMinRt] = useGlobalState('minRt');

  return {
    minRt,
    setMinRt,
  };
}

export function useMaxRt() {
  const [maxRt, setMaxRt] = useGlobalState('maxRt');

  return {
    maxRt,
    setMaxRt,
  };
}

export function useSpacerOptions() {
  const [spacerOptions, setSpacerOptions] = useGlobalState('spacerOptions');

  return {
    spacerOptions,
    setSpacerOptions,
  };
}

export function usePegRNA() {
  const [pegRNA, setPegRNA] = useGlobalState('pegRNA');

  return {
    pegRNA,
    setPegRNA,
  };
}

export function usePe3sgRNA() {
  const [pe3sgRNA, setPe3SgRNA] = useGlobalState('pe3sgRNA');

  return {
    pe3sgRNA,
    setPe3SgRNA,
  };
}
export function usePe3bsgRNA() {
  const [pe3bsgRNA, setPe3bSgRNA] = useGlobalState('pe3bsgRNA');

  return {
    pe3bsgRNA,
    setPe3bSgRNA,
  };
}

export function useStep() {
  const [step, setStep] = useGlobalState('step');
  return {
    step,
    setStep,
  };
}

export function useStep2Loading() {
  const [step2Loading, setStep2Loading] = useGlobalState('step2Loading');
  return {
    step2Loading,
    setStep2Loading,
  };
}
export function useStep3Loading() {
  const [step3Loading, setStep3Loading] = useGlobalState('step3Loading');
  return {
    step3Loading,
    setStep3Loading,
  };
}
