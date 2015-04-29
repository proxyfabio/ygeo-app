import Actions from '../../actions/appViewActions.js';
import React from 'react';
import Keyboard from '../Keyboard/keyboard.jsx';
import './feedback.styl';

export default React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			activeNode: null
		};
	},

	handleButtonClick(e){
		let value = e.target.value;
		let processedValue = String.fromCharCode(value);
		let oldValue = '';

		if(this.state.activeNode){
			oldValue = this.state.activeNode.value;
		}

		let newValue = '';

		switch(value){
			// esc
			case 27:
				this.context.router.transitionTo('/');
				break;
			case 13:
				Actions.sendFeedback({
					name: this.refs.userName.getDOMNode().value,
					text: this.refs.userText.getDOMNode().value
				});
				break;
			// backspace
			case 8:
				newValue = ' ';
				break;
			// space
			case 32:
			// else
			default:
				newValue = oldValue + processedValue;
				break;
		}
		if(this.state.activeNode && value !== 13 && newValue.length % 3 === 0){
			this.state.activeNode.value = newValue;
		}
	},

	setActiveField(e){
		this.setState({activeNode: e.target});
	},

  render(){
    return <section className="feedback">
			<div className="feedback__section">
				<label className="feedback__label">Как вас представить?</label>
				<input className="userName" ref="userName" onClick={this.setActiveField}></input>
				<label className="feedback__label">Ваше сообщение</label>
				<textarea className="userMessage" ref="userText" rows={10} onClick={this.setActiveField}></textarea>
				<section className="keyboard">
					<Keyboard
						className="keyboard__section"
						enterName="Отправить"
						onButtonClick={this.handleButtonClick}
					/>
				</section>
			</div>
    </section>;
  }
});
