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
        <Grid>
          <Grid.Row>
            <Grid.Column width={7}>
              <div style={{ maxWidth: '100%', overflowX: 'scroll' }}>
                <RTTemplates />
              </div>
            </Grid.Column>
            <Grid.Column width={7}>
              <div style={{ maxWidth: '100%', overflowX: 'scroll' }}>
                <PBSOptions />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'PE3',
    textAlign: 'left',
    render: () => (
      <Tab.Pane>
        <Grid>
          <Grid.Row>
            <Grid.Column width={7}>
              <div style={{ maxWidth: '100%', overflowX: 'scroll' }}>
                <PE3BOptions />
              </div>
            </Grid.Column>
            <Grid.Column width={7}>
              <div style={{ maxWidth: '100%', overflowX: 'scroll' }}>
                <PE3Options />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
];

const OutputTabs = () => <Tab panes={panes} />;

export default OutputTabs;
