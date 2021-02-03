import React from 'react';
import { trackEvent } from '../../api';
import events from '../../api/events';
import { useStep, useStep5Loading } from '../../hooks';
import Step4Form from './Step4Form';

const Submit = () => {
  const { setStep } = useStep();
  const { setStep5Loading } = useStep5Loading();

  async function onSubmit() {
    setStep(4);
    setStep5Loading(true);

    trackEvent(events.step4.submit);

    setTimeout(() => {
      const nextStep = document.getElementById('step-5-container');
      if (nextStep) {
        nextStep.scrollIntoView({ behavior: 'smooth' });
      }
      setStep5Loading(false);
    }, 1000);
  }
  return <Step4Form onSubmit={onSubmit} />;
};
export default Submit;
