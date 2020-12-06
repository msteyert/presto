import React, { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';

const AppMenu = () => (
  <Menu
    secondary
    pointing
    style={{
      position: 'sticky',
      top: 0,
      backgroundColor: '#f3f4f5',
      zIndex: 2,
      marginBottom: 0,
    }}
  >
    <Menu.Item name="Home" active></Menu.Item>
    <Menu.Item name="Instructions"></Menu.Item>
    <Menu.Item name="Examples"></Menu.Item>
  </Menu>
);

export default AppMenu;
