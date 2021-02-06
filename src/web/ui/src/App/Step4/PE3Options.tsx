import { useSequencePredictions } from '../../hooks';
import React, { Component, Fragment, SyntheticEvent } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { PE3Option } from '../../types/presto';
import { API_ROOT } from '../../config';

type Props = {
  options: PE3Option[];
  title: string;
  onChange: (value: PE3Option) => void;
};

// class PE3OptionsDropdown extends Component<Props> {
//   state = {
//     value:
//       this.props.options.length > 0
//         ? this.props.options[0]
//         : { secondGuide: '', type: 'pe3' },
//   };
//   static defaultProps = { options: [], onChange: (_: PE3Option) => {} };
//   handleChange = (
//     _: SyntheticEvent<HTMLElement, Event>,
//     { value }: DropdownItemProps,
//   ) => {
//     const selectedOption = this.props.options.filter(
//       (o) => o.secondGuide === value,
//     )[0];
//     this.setState({ value: selectedOption });
//     this.props.onChange(selectedOption);
//   };

//   render() {
//     const { value } = this.state;

//     return (
//       <div className="field-group">
//         {this.props.title}
//         <Dropdown placeholder="Choose an option" text={value.secondGuide}>
//           <Dropdown.Menu scrolling onChange={this.handleChange}>
//             {this.props.options.map((o) => (
//               <Dropdown.Item
//                 label={{
//                   color: o.type === 'pe3b' ? 'green' : undefined,
//                   content: o.type === 'pe3b' ? 'PE3B' : 'PE3',
//                 }}
//                 key={o.secondGuide}
//                 text={o.secondGuide}
//                 value={o.secondGuide}
//                 onClick={this.handleChange}
//               />
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     );
//   }
// }

class PE3OptionsDropdownAvatar extends Component<Props> {
  state = {
    value:
      this.props.options.length > 0 ? this.props.options[0].secondGuide : '',
  };
  static defaultProps = { options: [], onChange: (_: string) => {} };
  handleChange = (
    _: SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps,
  ) => {
    const selectedOption = this.props.options.filter(
      (o) => o.secondGuide === value,
    )[0];
    this.setState({ value: selectedOption.secondGuide });
    this.props.onChange(selectedOption);
  };

  render() {
    const { value } = this.state;

    return (
      <div className="field-group">
        <span className="field-label">{this.props.title}</span>
        <Dropdown
          placeholder="Choose an option"
          onChange={this.handleChange}
          options={this.props.options.map((o) => ({
            key: o.secondGuide,
            text: o.secondGuide,
            value: o.secondGuide,
            image:
              o.type !== 'None'
                ? {
                    src:
                      o.type === 'pe3'
                        ? `${API_ROOT}/images/pe3pill.png`
                        : `${API_ROOT}/images/pe3bpill.png`,
                  }
                : undefined,
          }))}
          value={value}
          selection
          scrolling
        ></Dropdown>
      </div>
    );
  }
}

const PE3Options = () => {
  const { pe3Options, updateSelectedPe3Option } = useSequencePredictions();
  return (
    <Fragment>
      {pe3Options.length > 0 && (
        <PE3OptionsDropdownAvatar
          title="PE3 Guides:"
          options={pe3Options}
          onChange={updateSelectedPe3Option}
        />
      )}
    </Fragment>
  );
};

export default PE3Options;
