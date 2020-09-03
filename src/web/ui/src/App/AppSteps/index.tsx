import React from 'react';
import { Grid } from 'semantic-ui-react';
import StepsProgress from '../../components/StepsProgress';
import { useStep } from '../../hooks';

const AppSteps = () => {
  const { step } = useStep();
  return (
    <Grid.Row>
      <Grid.Column width={14}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StepsProgress step={step} />
        </div>
      </Grid.Column>
    </Grid.Row>
  );
};
export default AppSteps;
