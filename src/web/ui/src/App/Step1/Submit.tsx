import React from 'react';
import {
  useStep,
  useWtSeq,
  useMut,
  usePam,
  useMinPbs,
  useMaxPbs,
  useMinRt,
  useMaxRt,
  useCustomSpacer,
  useSequencePredictions,
  useSpacerOptions,
} from '../../hooks';
import Step1Form from './Step1Form';

const Submit = () => {
  const { setSpacer, setSelectedSpacerOption } = useSequencePredictions();
  const { setWtSeq } = useWtSeq();
  const { setMut } = useMut();
  const { setCustomSpacer } = useCustomSpacer();
  const { setPam } = usePam();
  const { setMinPbs } = useMinPbs();
  const { setMaxPbs } = useMaxPbs();
  const { setMinRt } = useMinRt();
  const { setMaxRt } = useMaxRt();
  const { setStep } = useStep();
  const { setSpacerOptions } = useSpacerOptions();

  async function onSubmit(
    wtSeq: string,
    mut: string,
    customSpacer: string,
    pam: string,
    minPbs: number,
    maxPbs: number,
    minRt: number,
    maxRt: number,
  ) {
    if (customSpacer !== '') {
      setSpacer(customSpacer.toUpperCase());
      setSelectedSpacerOption(customSpacer.toUpperCase());
      setSpacerOptions([customSpacer]);
    }
    setWtSeq(wtSeq);
    setMut(mut);
    setCustomSpacer(customSpacer);
    setPam(pam);
    setMinPbs(minPbs);
    setMaxPbs(maxPbs);
    setMinRt(minRt);
    setMaxRt(maxRt);
    setStep(1);

    setTimeout(() => {
      const nextStep = document.getElementById('step-2-container');
      if (nextStep) {
        nextStep.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }
  return <Step1Form onSubmit={onSubmit} />;
};
export default Submit;
