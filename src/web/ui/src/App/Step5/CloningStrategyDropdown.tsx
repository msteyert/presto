import React, { Component, SetStateAction, SyntheticEvent } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { useCloningStrategy } from '../../hooks';

const options = ['Richardson & Steyert et al. 2021', 'None'].map((o) => ({
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
    <div className="field-group">
      <span className="field-label">Cloning strategy</span>
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
