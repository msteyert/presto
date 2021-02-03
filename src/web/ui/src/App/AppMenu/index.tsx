import React from 'react';
import { Menu } from 'semantic-ui-react';
import { API_ROOT } from '../../config';

const AppMenu = () => (
  <Menu
    secondary
    pointing
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      backgroundColor: '#f3f4f5',
      zIndex: 2,
      marginBottom: 0,
    }}
  >
    <img
      alt="PegAssist Logo"
      src={`${API_ROOT}/icon/apple-icon.png`}
      style={{ height: 50 }}
    />
    <Menu.Item name="Home" active></Menu.Item>
    <Menu.Item name="Instructions"></Menu.Item>
    <Menu.Item name="Examples"></Menu.Item>
  </Menu>
);

export default AppMenu;
