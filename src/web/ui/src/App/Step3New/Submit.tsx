import React from 'react';
import { useStep } from '../../hooks';
import Step3Form from './Step3Form';

const Submit = () => {
  const { setStep } = useStep();

  async function onSubmit() {
    setStep(3);

    setTimeout(() => {
      const nextStep = document.getElementById('step-4-container');
      if (nextStep) {
        nextStep.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }
  return <Step3Form onSubmit={onSubmit} />;
};
export default Submit;
