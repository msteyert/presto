import React from 'react';
import { trackEvent } from '../../api';
import events from '../../api/events';
import {
  useSequencePredictions,
  useCleanWtSeq,
  useCleanMutSeq,
  useStep,
  useWtSeq,
  useMut,
  usePam,
  useMinPbs,
  useMaxPbs,
  useMinRt,
  useMaxRt,
  useStep3Loading,
} from '../../hooks';
import Step2Form from './Step2Form';

const Submit = () => {
  const { updateSequencePredictions } = useSequencePredictions();
  const { getCleanWtSeq } = useCleanWtSeq();
  const { getCleanMutSeq } = useCleanMutSeq();
  const { setStep } = useStep();

  const { wtSeq } = useWtSeq();
  const { mut } = useMut();
  const { spacer } = useSequencePredictions();
  const { pam } = usePam();
  const { minPbs } = useMinPbs();
  const { maxPbs } = useMaxPbs();
  const { minRt } = useMinRt();
  const { maxRt } = useMaxRt();
  const { setStep3Loading } = useStep3Loading();

  async function onSubmit() {
    setStep3Loading(true);
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
    setStep(2);

    trackEvent(events.step2.submit);

    setTimeout(() => {
      const nextStep = document.getElementById('step-3-container');
      if (nextStep) {
        nextStep.scrollIntoView({ behavior: 'smooth' });
      }
      setStep3Loading(false);
    }, 0);
  }
  return <Step2Form onSubmit={onSubmit} />;
};
export default Submit;
