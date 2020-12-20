import { useSequencePredictions } from '../../hooks';
import React, { Component, Fragment, SyntheticEvent } from 'react';
import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react';
import { PE3Option } from '../../types/presto';

type Props = {
  options: PE3Option[];
  title: string;
  onChange: (value: PE3Option) => void;
};

class PE3OptionsDropdown extends Component<Props> {
  state = {
    value:
      this.props.options.length > 0
        ? this.props.options[0]
        : { secondGuide: '', type: 'pe3' },
  };
  static defaultProps = { options: [], onChange: (_: PE3Option) => {} };
  handleChange = (
    _: SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownItemProps,
  ) => {
    const selectedOption = this.props.options.filter(
      (o) => o.secondGuide === value,
    )[0];
    this.setState({ value: selectedOption });
    this.props.onChange(selectedOption);
  };

  render() {
    const { value } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.props.title}
        <Dropdown placeholder="Choose an option" text={value.secondGuide}>
          <Dropdown.Menu scrolling onCh>
            {this.props.options.map((o) => (
              <Dropdown.Item
                label={{
                  color: o.type === 'pe3b' ? 'green' : undefined,
                  content: o.type === 'pe3b' ? 'PE3B' : 'PE3',
                }}
                key={o.secondGuide}
                text={o.secondGuide}
                value={o.secondGuide}
                onClick={this.handleChange}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

const PE3Options = () => {
  const { pe3Options, updateSelectedPe3Option } = useSequencePredictions();
  return (
    <Fragment>
      {pe3Options.length > 0 && (
        <PE3OptionsDropdown
          title="PE3 Guides:"
          options={pe3Options}
          onChange={updateSelectedPe3Option}
        />
      )}
    </Fragment>
  );
};

export default PE3Options;
