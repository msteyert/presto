import React from 'react';
import { useStep } from '../../hooks';
import Step4Form from './Step4Form';

const Submit = () => {
  const { setStep } = useStep();

  async function onSubmit() {
    setStep(4);

    setTimeout(() => {
      const nextStep = document.getElementById('step-5-container');
      if (nextStep) {
        nextStep.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }
  return <Step4Form onSubmit={onSubmit} />;
};
export default Submit;
