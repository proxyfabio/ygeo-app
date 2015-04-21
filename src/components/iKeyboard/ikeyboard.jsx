import React from 'react';
import {Routehandler} from 'react-router';
import Keyboard from '../Keyboard/keyboard.jsx';
import Actions from '../../actions/appViewActions.js';

export default class IKeyboard extends React.Component {

	handleButtonClick(e){
		let value = e.target.value;
		switch(value){
			// esc
			case 27:
				this.context.router.transitionTo('/');
				break;
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
				onEnterClick={this.props.onEnterClick}
			/>
    </section>;
  }
}
