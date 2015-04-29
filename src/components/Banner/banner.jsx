'use strict';
import React from 'react';
import Action from '../../actions/appViewActions.js';
import BannerStore from '../../stores/bannerStore.js';
import {Link} from 'react-router';
import './banner.styl';
import 'react/addons';
let cx = React.addons.classSet;

import 'react/addons';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Promo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			id: 0,
			image: '',
			introtext: '',
			title: '',
			visibility: true
		};
	}

	componentDidMount() {
		import Env from '../../helpers/globalData.js';
		var data = this.context.router.getCurrentParams();
		data.resId = Env.AppId;

		Action.getActualBanner(data);

		setInterval(function(){
			Action.getActualBanner(data);
		}, this.props.interval);

		setInterval(function(){
			this.setState({visibility:true});
		}.bind(this),1000*60*3);
	}

	componentWillMount() {
		BannerStore.addChangeListener(this.onChange.bind(this));
	}

	componentWillUnmount() {
		BannerStore.removeChangeListener(this.onChange.bind(this));
	}

	onChange(){
		this.setState(BannerStore.getState());
	}

	handlecloseBanner(){
		this.setState({visibility: false});
	}

	render(){
		let className = '';
		if(!this.state.visibility){
			className += ' off';
		}

		if(!this.state.image){
			return false;
		}

		var text = '';
		if(!this.state.title && !this.state.introtext){
			text = 'inactive';
		}

    return <section className={'promo' + className}>
			<div className="promo__close" onClick={this.handlecloseBanner.bind(this)}></div>
			<Link to="promo" params={{promoId: this.state.id}}>
				<img src={this.state.image} className={className} />
				<div className={cx('promo__text',text)}>
					<h2>{this.state.title}</h2>
					<p>{this.state.introtext}</p>
				</div>
			</Link>
		</section>;
  }
}

Promo.contextTypes = {
  router: React.PropTypes.func
};
