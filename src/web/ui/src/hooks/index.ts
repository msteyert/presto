import {
  generateTemplateOptions,
  generateCleanWtSeq,
  generateMutSeq,
  generatePrimerBindingSiteOptions,
  generatePe3Options,
  generatePegRNA,
  generateSgRNA,
  generateSpacerSgRNA,
  generateWarnings,
} from '../api';
import {
  GlobalState,
  PBSOption,
  PE3Option,
  TemplateOption,
} from '../types/presto';
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
  pe3Options: [],
  selectedPe3Option: null,
  cleanWtSeq: '',
  cleanMutSeq: '',
  step: 0,
  pegRNA: null,
  pe3sgRNA: { sense: '', antisense: '' },
  spacersgRNA: { sense: '', antisense: '' },
  warnings: {
    general: [],
    pegRna: [],
    pe3: [],
  },
  spacerError: false,
  step2Loading: false,
  step3Loading: false,
  step4Loading: false,
  step5Loading: false,
  cloningStrategy: 'Richardson & Steyert et al. 2021',
  step3Advanced: false,
};

export const { useGlobalState, getGlobalState } = createGlobalState(
  initialState,
);

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
  const [pe3Options, setPe3Options] = useGlobalState('pe3Options');
  const [pegRNA, setPegRNA] = useGlobalState('pegRNA');
  const [pe3sgRNA, setPe3sgRNA] = useGlobalState('pe3sgRNA');
  const [spacersgRNA, setSpacersgRNA] = useGlobalState('spacersgRNA');
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
      setSelectedTemplateOption(getGlobalState('templateOptions')[0]);
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
      setSelectedPbsOption(getGlobalState('pbsOptions')[0]);
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
    setPe3Options([
      ...pe3Options,
      {
        pamStart: 0,
        cutPE3: 0,
        cutDiff: 0,
        secondGuide: 'None',
        rcSecondGuide: 'None',
        type: 'None',
      },
    ]);
    if (getGlobalState('pe3Options').length > 0) {
      setSelectedPe3Option(getGlobalState('pe3Options')[0]);
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
      const pegRNA = await generatePegRNA(
        globalSpacer.toUpperCase(),
        globalSelectedTemplateOption.rt.toUpperCase(),
        globalSelectedPbsOption.pbs.toUpperCase(),
      );
      setPegRNA(pegRNA);
    }
  }

  function updateSelectedTemplateOption(option: TemplateOption) {
    setSelectedTemplateOption(option);
    updatePegRNA();
  }

  function updateSelectedPbsOption(option: PBSOption) {
    setSelectedPbsOption(option);
    updatePegRNA();
  }

  function updateSelectedPe3Option(option: PE3Option) {
    setSelectedPe3Option(option);
    updateSgRNA();
  }

  async function updateSgRNA() {
    const globalSelectedPe3Option = getGlobalState('selectedPe3Option');
    const globalSpacer = getGlobalState('spacer');
    if (globalSelectedPe3Option) {
      const sgRNA = await generateSgRNA(
        globalSelectedPe3Option.secondGuide.toUpperCase(),
      );
      setPe3sgRNA(sgRNA);
    }

    const spacersgRNA = await generateSpacerSgRNA(globalSpacer);
    setSpacersgRNA(spacersgRNA);
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
    selectedPbsOption,
    pe3Options,
    pegRNA,
    pe3sgRNA,
    spacersgRNA,
    warnings,
    setSpacer,
    selectedTemplateOption,
    selectedPe3Option,
    updateSelectedTemplateOption,
    updateSelectedPbsOption,
    updateSelectedPe3Option,
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

export function useSpacerError() {
  const [spacerError, setSpacerError] = useGlobalState('spacerError');
  return {
    spacerError,
    setSpacerError,
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
export function useStep4Loading() {
  const [step4Loading, setStep4Loading] = useGlobalState('step4Loading');
  return {
    step4Loading,
    setStep4Loading,
  };
}

export function useStep5Loading() {
  const [step5Loading, setStep5Loading] = useGlobalState('step5Loading');
  return {
    step5Loading,
    setStep5Loading,
  };
}

export function useCloningStrategy() {
  const [cloningStrategy, setCloningStrategy] = useGlobalState(
    'cloningStrategy',
  );
  return {
    cloningStrategy,
    setCloningStrategy,
  };
}

export function useStep3Advanced() {
  const [step3Advanced, setStep3Advanced] = useGlobalState('step3Advanced');
  return {
    step3Advanced,
    setStep3Advanced,
  };
}
