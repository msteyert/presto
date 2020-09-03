import React from 'react';
import { Tab, Grid } from 'semantic-ui-react';
import RTTemplates from './RTTemplates';
import PBSOptions from './PBSOptions';

const panes = [
  {
    menuItem: 'pegRNA',
    textAlign: 'left',
    render: () => (
      <Tab.Pane>
        <Grid.Column width={5}>
          <RTTemplates />
          <div style={{ height: '20px' }} />
          <PBSOptions />
        </Grid.Column>
      </Tab.Pane>
    ),
  },
  { menuItem: 'PE3', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
];

const OutputTabs = () => <Tab panes={panes} />;

export default OutputTabs;
