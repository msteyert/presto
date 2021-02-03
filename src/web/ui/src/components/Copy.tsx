import React, { Component } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

const DEFAULT_HELP_TEXT = 'click to copy';
const SUCCESS_HELP_TEXT = "you're all set";
type Props = {
  value: string | undefined;
};

class Copy extends Component<Props> {
  state = {
    helpText: DEFAULT_HELP_TEXT,
    isOpen: false,
  };
  handleCopy = () => {
    if (this.props.value) {
      copy(this.props.value);
      this.setState(() => ({ helpText: SUCCESS_HELP_TEXT }));
      console.log('indicate');
      setTimeout(() => {
        this.setState(() => ({ helpText: DEFAULT_HELP_TEXT }));
      }, 1000);
    }
  };

  handleMouseOver = () => {
    this.setState(() => ({ isOpen: true }));
  };
  handleMouseLeave = () => {
    this.setState(() => ({ isOpen: false }));
  };

  render() {
    return (
      <Popup
        content={this.state.helpText}
        position="top center"
        open={this.state.isOpen}
        trigger={
          <Icon
            name="copy"
            onClick={this.handleCopy}
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}
            link
          />
        }
      />
    );
  }
}

export default Copy;
