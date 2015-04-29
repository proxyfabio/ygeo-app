import React from 'react';
import Env from '../../constants/env.js';
import './easterEgg.styl';

export default React.createClass({

	getInitialState: function() {
		return {
			visible: true
		};
	},

	handleClose(){
		this.setState({visible: false});
	},

  render(){

		if(!this.state.visible){
			return null;
		}

    return <div className="easterEgg">
			<div className="easterEgg__close" onClick={this.handleClose}></div>
			<img className="easterEgg__content" src={Env.eggSrc}></img>
    </div>;
  }
});
