'use strict';
import React from 'react';
import PromoStore from '../../stores/promoStore.js';
import Scrollbar from '../geminiScrollbar/geminiScrollbar.jsx';
import {index} from '../../constants/routes.js';
import Action from '../../actions/appViewActions.js';
import './promoPreview.styl';

export default class Promo extends React.Component {
	constructor(props){
		super(props);

		let {content, title} = PromoStore.getState();
		this.state = {content, title};
	}

	componentDidMount() {
		import Env from '../../helpers/globalData.js';
		Action.getBanner({
			resId: Env.AppId,
			bannerId: this.context.router.getCurrentParams().promoId
		});
	}

	componentWillMount() {
		PromoStore.addChangeListener(this.onChange.bind(this));
	}

	componentWillUnmount() {
		PromoStore.removeChangeListener(this.onChange.bind(this));
	}

	onChange(){
		let {content, title} = PromoStore.getState();
		this.setState({content, title});
	}

	handleClosePromo(){
		this.context.router.transitionTo(index);
	}

	addClass(cls, ns){
		return [ns, cls].join('') + ' ';
	}

	render(){
		let ns = 'promoPanel';
    return <section className={ns}>
			<div className={this.addClass('__close', ns)} onClick={this.handleClosePromo.bind(this)}></div>
			<Scrollbar>
				<div className={this.addClass('__content', ns)} dangerouslySetInnerHTML={{__html: String(this.state.content || '')}}></div>
			</Scrollbar>
		</section>;
  }
}

Promo.contextTypes = {
  router: React.PropTypes.func
};
