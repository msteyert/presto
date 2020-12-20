import React from 'react';
import { Tab, Grid } from 'semantic-ui-react';
import PegRNAWarnings from './PegRNAWarnings';
import Pe3Warnings from './Pe3Warnings';
import RTTemplates from './RTTemplates';
import PBSOptions from './PBSOptions';
import PE3Options from './PE3Options';
import PegRNA from './PegRNA';
import Pe3sgRNA from './Pe3sgRNA';

const panes = [
  {
    menuItem: 'pegRNA',
    textAlign: 'left',
    render: () => (
      <Tab.Pane>
        <PegRNAWarnings />
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <RTTemplates />
            </Grid.Column>
            <Grid.Column width={8}>
              <PBSOptions />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <PegRNA />
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
        <Pe3Warnings />
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <PE3Options />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Pe3sgRNA />
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    ),
  },
];

const OutputTabs = () => <Tab panes={panes} />;

export default OutputTabs;
