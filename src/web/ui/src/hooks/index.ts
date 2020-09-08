import {
  generateTemplateOptions,
  generateCleanWtSeq,
  generateMutSeq,
  generatePrimerBindingSiteOptions,
  generatePe3Options,
} from '../api';
import { GlobalState, PE3Option } from '../types/presto';
import { createGlobalState } from 'react-hooks-global-state';

const initialState: GlobalState = {
  templateOptions: [],
  pbsOptions: [],
  pe3bOptions: [],
  pe3Options: [],
  cleanWtSeq: '',
  cleanMutSeq: '',
  step: 0,
};
const { useGlobalState } = createGlobalState(initialState);

export function useSequencePredictions() {
  const [templateOptions, setTemplateOptions] = useGlobalState(
    'templateOptions',
  );

  const [pbsOptions, setPBSOptions] = useGlobalState('pbsOptions');
  const [pe3bOptions, setPe3bOptions] = useGlobalState('pe3bOptions');
  const [pe3Options, setPe3Options] = useGlobalState('pe3Options');

  async function generateSequencePredictions(
    wtSeq: string,
    mut: string,
    spacer: string,
  ) {
    setTemplateOptions(await generateTemplateOptions(wtSeq, mut, spacer));
    setPBSOptions(await generatePrimerBindingSiteOptions(wtSeq, mut, spacer));
    const pe3Options: PE3Option[] = await generatePe3Options(
      wtSeq,
      mut,
      spacer,
    );
    setPe3bOptions(pe3Options.filter((option) => option.type === 'pe3b'));
    setPe3Options(pe3Options.filter((option) => option.type === 'pe3'));
  }

  return {
    templateOptions,
    pbsOptions,
    pe3bOptions,
    pe3Options,
    generateSequencePredictions,
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

export function useStep() {
  const [step, setStep] = useGlobalState('step');
  return {
    step,
    setStep,
  };
}
