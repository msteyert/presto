import React, { Component, SetStateAction, SyntheticEvent } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { useCloningStrategy } from '../../hooks';

const options = ['Richardson', 'None'].map((o) => ({
  key: o,
  text: o,
  value: o,
}));

const handleChangeFactory = (
  setCloningStrategy: (u: SetStateAction<string>) => void,
) => (_: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps) => {
  setCloningStrategy(value as string);
};

const CloningStrategyDropdown = () => {
  const { setCloningStrategy } = useCloningStrategy();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      Cloning strategy
      <Dropdown
        onChange={handleChangeFactory(setCloningStrategy)}
        options={options}
        placeholder="Choose an option"
        selection
        scrolling
        defaultValue={options[0].value}
      />
    </div>
  );
};

export default CloningStrategyDropdown;
