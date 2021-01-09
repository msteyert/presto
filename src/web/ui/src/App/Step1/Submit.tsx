import React from 'react';
import { generateSpacers, trackEvent } from '../../api';
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
  useStep2Loading,
  useSpacerError,
} from '../../hooks';
import { SpacerOption } from '../../types/presto';
import Step1Form from './Step1Form';
import Events from '../../api/events';

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
  const { spacerOptions, setSpacerOptions } = useSpacerOptions();
  const { setStep2Loading, step2Loading } = useStep2Loading();
  const { setSpacerError } = useSpacerError();

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
    setStep2Loading(true);
    let finalSpacerOptions: SpacerOption[] = [];

    if (customSpacer !== '') {
      setSpacer(customSpacer.toUpperCase());
      const customSpacerOption = {
        spacer: customSpacer.toUpperCase(),
        cutToMut: null,
        quality: null,
      };
      finalSpacerOptions = [customSpacerOption];
      setSelectedSpacerOption(customSpacerOption);
      setSpacerOptions([customSpacerOption]);
    }

    const apiSpacerOptions = await generateSpacers(wtSeq, mut, pam);
    finalSpacerOptions = [
      ...finalSpacerOptions,
      ...spacerOptions,
      ...apiSpacerOptions,
    ];

    if (finalSpacerOptions.length === 0) {
      setSpacerError(true);
      setStep2Loading(false);
      return;
    }

    setSpacerError(false);

    setSpacerOptions(finalSpacerOptions);
    setSelectedSpacerOption(finalSpacerOptions[0]);

    setWtSeq(wtSeq);
    setMut(mut);
    setCustomSpacer(customSpacer);
    setSpacer(finalSpacerOptions[0].spacer);
    setPam(pam);
    setMinPbs(minPbs);
    setMaxPbs(maxPbs);
    setMinRt(minRt);
    setMaxRt(maxRt);
    setStep(1);

    trackEvent(Events.step1.submit);

    setTimeout(() => {
      const nextStep = document.getElementById('step-2-container');
      if (nextStep) {
        nextStep.scrollIntoView({ behavior: 'smooth' });
      }
      setStep2Loading(false);
    }, 0);
  }
  return <Step1Form onSubmit={onSubmit} loading={step2Loading} />;
};
export default Submit;
