import React from 'react';
import {
  useSequencePredictions,
  useCleanWtSeq,
  useCleanMutSeq,
  useStep,
} from '../../hooks';
import SubmitForm from '../../components/SubmitForm';

const Submit = () => {
  const { updateSequencePredictions } = useSequencePredictions();
  const { getCleanWtSeq } = useCleanWtSeq();
  const { getCleanMutSeq } = useCleanMutSeq();
  const { setStep } = useStep();

  async function onSubmit(wtSeq: string, mut: string, spacer: string) {
    getCleanWtSeq(wtSeq, mut, spacer);
    getCleanMutSeq(wtSeq, mut, spacer);
    await updateSequencePredictions(wtSeq, mut, spacer);
    setStep(1);
  }
  return <SubmitForm onSubmit={onSubmit} />;
};
export default Submit;
