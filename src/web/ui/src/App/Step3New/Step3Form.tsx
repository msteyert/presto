import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import RTTemplates from './RTTemplates';
import PBSOptions from './PBSOptions';

type Props = {
  onSubmit: () => Promise<void>;
};

const Step3Form = ({ onSubmit }: Props) => {
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
          <Form.Button content="Next" primary />
        </Form>
      </Grid.Row>
    </div>
  );
};

export default Step3Form;
