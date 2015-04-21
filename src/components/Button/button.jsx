import React from 'react';

export default class Button extends React.Component {
  render(){
		let char = this.props.char;
    let value = this.props.value;
    return <li onClick={this.props.onClick.bind(this)} value={char} className={this.props.className || 'button'}>
			{value ? value : (!isNaN(char) ? String.fromCharCode(char) : char)}
		</li>;
  }
}

Button.contextTypes = {
  router: React.PropTypes.func
};
