import React from 'react';
import { trackEvent } from '../../api';
import events from '../../api/events';
import { useStep, useStep4Loading } from '../../hooks';
import Step3Form from './Step3Form';

const Submit = () => {
  const { setStep } = useStep();
  const { setStep4Loading } = useStep4Loading();

  async function onSubmit() {
    setStep(3);
    setStep4Loading(true);

    trackEvent(events.step3.submit);

    setTimeout(() => {
      const nextStep = document.getElementById('step-4-container');
      if (nextStep) {
        nextStep.scrollIntoView({ behavior: 'smooth' });
        setStep4Loading(false);
      }
    }, 0);
  }
  return <Step3Form onSubmit={onSubmit} />;
};
export default Submit;
