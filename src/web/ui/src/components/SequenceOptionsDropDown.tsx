import React, { Component, SyntheticEvent } from 'react';
import { DropdownProps } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  options: string[];
  title: string;
};

export default class SequenceOptionsDropdown extends Component<Props> {
  state = { value: this.props.options.length > 0 ? this.props.options[0] : '' };
  static defaultProps = { options: [] };
  handleChange = (
    _: SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps,
  ) => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.props.title}
        <Dropdown
          onChange={this.handleChange}
          options={this.props.options.map((o) => ({
            key: o,
            text: o,
            value: o,
          }))}
          placeholder="Choose an option"
          selection
          scrolling
          value={value}
        />
      </div>
    );
  }
}
