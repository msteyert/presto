import React from 'react';
import AppMenu from './AppMenu';
import { Grid } from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { useStep } from '../hooks';
import Step1 from './Step1';
import Step2 from './Step2';
import Steps from './AppSteps';

function App() {
  const { step } = useStep();

  return (
    <div style={{ position: 'relative' }}>
      <AppMenu />
      <Grid centered>
        <Steps />
        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
      </Grid>
    </div>
  );
}

export default App;
