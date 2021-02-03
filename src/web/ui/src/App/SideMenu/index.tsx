import React, { SetStateAction } from 'react';
import { useStep } from '../../hooks';
import { Grid, Icon } from 'semantic-ui-react';
import AppSteps from '../AppSteps';
import StepsProgress from '../../components/StepsProgress';

const onClickFactory = (
  step: number,
  setStep: (u: SetStateAction<number>) => void,
) => () => {
  const target = document.getElementById(`step-${step}-container`);
  if (target) {
    target.scrollIntoView({ block: 'end', behavior: 'smooth' });
    // setStep(step - 1);
  }
};

const steps = [
  {
    number: 1,
    name: 'Start',
    description: 'Enter Sequence information',
  },
  {
    number: 2,
    name: 'Spacer',
    description: 'Select your spacer',
  },
  {
    number: 3,
    name: 'pegRNA',
    description: 'Design your pegRNA',
  },
  {
    number: 4,
    name: 'PE3',
    description: 'Choose a PE3 sequence',
  },
  {
    number: 5,
    name: 'Cloning',
    description: 'Choose your cloning strategy',
  },
];

const SideMenu = () => {
  const { step } = useStep();
  return (
    <div className="side-menu-container">
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingLeft: 40 }}
      >
        <StepsProgress step={step} vertical />
      </div>
    </div>
  );
};
export default SideMenu;
