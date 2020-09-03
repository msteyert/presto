import React from 'react';
import { Menu } from 'semantic-ui-react';

const AppMenu = () => (
  <Menu
    secondary
    pointing
    style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1,
    }}
  >
    <Menu.Item name="Home" active></Menu.Item>
    <Menu.Item name="Instructions"></Menu.Item>
    <Menu.Item name="Examples"></Menu.Item>
  </Menu>
);

export default AppMenu;
