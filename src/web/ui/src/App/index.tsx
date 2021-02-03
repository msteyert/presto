import React from 'react';
import AppMenu from './AppMenu';
import SideMenu from './SideMenu';
import { Grid } from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { useStep } from '../hooks';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Steps from './AppSteps';

function App() {
  const { step } = useStep();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AppMenu />

      {/* <Steps /> */}
      <SideMenu />
      <div className="main-content-container">
        <Grid centered>
          <Step1 />
          {step >= 1 && <Step2 />}
          {step >= 2 && <Step3 />}
          {step >= 3 && <Step4 />}
          {step >= 4 && <Step5 />}
        </Grid>
      </div>
    </div>
  );
}

export default App;
