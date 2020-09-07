import {
  generateTemplateOptions,
  generateCleanWtSeq,
  generateMutSeq,
  generatePrimerBindingSiteOptions,
} from '../api';
import { GlobalState } from '../types/peggy';
import { createGlobalState } from 'react-hooks-global-state';

const initialState: GlobalState = {
  templateOptions: [],
  pbsOptions: [],
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

  async function generateSequencePredictions(
    wtSeq: string,
    mut: string,
    spacer: string,
  ) {
    setTemplateOptions(await generateTemplateOptions(wtSeq, mut, spacer));
    setPBSOptions(await generatePrimerBindingSiteOptions(wtSeq, mut, spacer));
  }

  return {
    templateOptions,
    pbsOptions,
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
