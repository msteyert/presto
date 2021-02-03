import React from 'react';
import { Grid } from 'semantic-ui-react';
import StepsProgress from '../../components/StepsProgress';
import { useStep } from '../../hooks';

const AppSteps = () => {
  const { step } = useStep();
  return (
    <div
      style={{
        position: 'sticky',
        top: 40,
        backgroundColor: 'white',
        zIndex: 1,
        borderBottom: '1px solid rgba(34,36,38,.15)',
      }}
    >
      <Grid.Row>
        <Grid.Column width={16}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StepsProgress step={step} />
          </div>
        </Grid.Column>
      </Grid.Row>
    </div>
  );
};
export default AppSteps;
