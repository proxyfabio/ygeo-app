import React from 'react';
import Keyboard from '../Keyboard/keyboard.jsx';
import Actions from '../../actions/appViewActions.js';

export default class IKeyboard extends React.Component {

	handleButtonClick(e){
		let value = e.target.value;
		switch(value){
			// esc
			case 27:
				location.hash = '#';
				break;
			// enter
			case 13:
			// space
			case 32:
			// backspace
			case 8:
			// else
			default:
				Actions.clickKeybordButton(value);
				break;
		}
	}

	render(){
    return <section className="keyboard">
			<Keyboard
				className="keyboard__section"
				onButtonClick={this.handleButtonClick}
			/>
    </section>;
  }
}
