import React from 'react';
import './keyboard.styl';
import Button from '../Button/button.jsx';

export default class Keyboard extends React.Component {

	renderButtonSequence(seq, className){
		return seq.map((el, i) => {
			return <Button key={i} char={el} onClick={this.props.onButtonClick} className={'keyboard__button ' + className} />;
		});
	}

	render(){
		let ns = 'keyboard';
		let symbols = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 46, 96];
		let lettersLine1 = [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098];
		let lettersLine2 = [1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101];
		let lettersLine3 = [1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102];

    return <ul className={this.props.className || ns}>
			{this.renderButtonSequence(symbols, ns + '__button--firstLine')}
			<br/>
			{this.renderButtonSequence(lettersLine1)}
			<Button char={8} value="Стереть" onClick={this.props.onButtonClick} className={ns + '__backspace ' + ns + '__button'} />
			<br/>
			{this.renderButtonSequence(lettersLine2)}
			<Button char={13} value="Найти" onClick={this.props.onButtonClick} className={ns + '__enter ' + ns + '__button'} />
			<br/>
			{this.renderButtonSequence(lettersLine3)}
			<Button char={27} value="Закрыть" onClick={this.props.onButtonClick} className={ns + '__esc ' + ns + '__button'} />
			<br/>
			<Button char={32} onClick={this.props.onButtonClick} className={ns + '__space ' + ns + '__button'} />
    </ul>;
  }
}
