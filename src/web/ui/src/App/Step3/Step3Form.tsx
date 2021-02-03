import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import RTTemplates from './RTTemplates';
import PBSOptions from './PBSOptions';
import { useStep4Loading, useStep3Advanced } from '../../hooks';

type Props = {
  onSubmit: () => Promise<void>;
};

const handleAdvancedToggleFactory = (
  step3Advanced: boolean,
  setStep3Advanced: (u: React.SetStateAction<boolean>) => void,
) => (e: any) => {
  e.preventDefault();
  setStep3Advanced(!step3Advanced);
};

const Step3Form = ({ onSubmit }: Props) => {
  const { step4Loading } = useStep4Loading();
  const { step3Advanced, setStep3Advanced } = useStep3Advanced();
  return (
    <div>
      <Grid.Row>
        <Form onSubmit={onSubmit}>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1, paddingRight: '7px' }}>
              <RTTemplates />
            </div>
            <div style={{ flexGrow: 1, paddingLeft: '7px' }}>
              <PBSOptions />
            </div>
          </div>
          <div style={{ height: 15 }} />

          <Form.Group>
            <Form.Button content="Next" loading={step4Loading} primary />
            <Form.Button
              content={`${step3Advanced ? 'Hide' : 'Show'} Details`}
              onClick={handleAdvancedToggleFactory(
                step3Advanced,
                setStep3Advanced,
              )}
              basic
            />
          </Form.Group>
        </Form>
      </Grid.Row>
    </div>
  );
};

export default Step3Form;
