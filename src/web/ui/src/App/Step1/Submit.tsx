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

  async function onSubmit(
    wtSeq: string,
    mut: string,
    spacer: string,
    pam: string,
    minPbs: number,
    maxPbs: number,
    minRt: number,
    maxRt: number,
  ) {
    getCleanWtSeq(wtSeq, mut, spacer, pam, minPbs, maxPbs, minRt, maxRt);
    getCleanMutSeq(wtSeq, mut, spacer, pam, minPbs, maxPbs, minRt, maxRt);
    await updateSequencePredictions(
      wtSeq,
      mut,
      spacer,
      pam,
      minPbs,
      maxPbs,
      minRt,
      maxRt,
    );
    setStep(1);
  }
  return <SubmitForm onSubmit={onSubmit} />;
};
export default Submit;
