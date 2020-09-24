import React from 'react';
import { Tab, Grid } from 'semantic-ui-react';
import RTTemplates from './RTTemplates';
import PBSOptions from './PBSOptions';
import PE3BOptions from './PE3BOptions';
import PE3Options from './PE3Options';

const panes = [
  {
    menuItem: 'pegRNA',
    textAlign: 'left',
    render: () => (
      <Tab.Pane>
        <Grid.Column width={5}>
          <div
            style={{ width: '30vw', overflowX: 'scroll', overflowY: 'auto' }}
          >
            <RTTemplates />
            <div style={{ height: '20px' }} />
            <PBSOptions />
          </div>
        </Grid.Column>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'PE3',
    textAlign: 'left',
    render: () => (
      <Tab.Pane>
        <Grid.Column width={5}>
          <div
            style={{ width: '30vw', overflowX: 'scroll', overflowY: 'auto' }}
          >
            <PE3BOptions />
            <div style={{ height: '20px' }} />
            <PE3Options />
          </div>
        </Grid.Column>
      </Tab.Pane>
    ),
  },
];

const OutputTabs = () => <Tab panes={panes} />;

export default OutputTabs;
