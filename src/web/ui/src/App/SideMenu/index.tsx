import React, { SetStateAction } from 'react';
import { useStep } from '../../hooks';
import { Icon } from 'semantic-ui-react';

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
  const { step, setStep } = useStep();
  return (
    <div
      style={{
        position: 'absolute',
        paddingTop: 16,
        top: 40,
        left: 0,
        width: 100,
        height: 'calc(100vh - 40px)',
        backgroundColor: '#f3f4f5',
        zIndex: 2,
        borderRight: '2px solid rgba(34,36,38,.15)',
      }}
    >
      {steps.map((menuStep) => (
        <div
          style={{
            paddingLeft: 16,
            margin: 0,
            opacity: step >= menuStep.number - 1 ? 1 : 0.25,
            cursor: step >= menuStep.number - 1 ? 'pointer' : 'arrow',
            // borderBottom: '1px solid rgba(34,36,38,.15)',
          }}
          onClick={onClickFactory(menuStep.number, setStep)}
        >
          <div style={{ display: 'flex' }}>
            <h4 style={{ margin: 0 }}>{menuStep.name}</h4>
            {step > menuStep.number - 1 && (
              <Icon name="check circle" color="green" />
            )}
          </div>
          {/* {step > menuStep.number - 1 && (
            <i
              style={{ position: 'relative', left: 14 }}
              className="arrow down"
            />
          )} */}
          {/* <p>{menuStep.description}</p> */}
        </div>
      ))}
    </div>
  );
};
export default SideMenu;
