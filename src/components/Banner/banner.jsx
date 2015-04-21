'use strict';
import React from 'react';
import Action from '../../actions/appViewActions.js';
import BannerStore from '../../stores/bannerStore.js';
import './banner.styl';

export default class Promo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			image: '',
			text: '',
			title: ''
		};
	}

	componentDidMount() {
		Action.getActualBanner(this.context.router.getCurrentParams());
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

	render(){
    return <section className='promo'>
			<div className="promo__close"></div>
			<a href="javascript:void(0)">
				<img src={this.state.image}/>
				<div className="promo__text">
					<h2>{this.state.title}</h2>
					<p>{this.state.text}</p>
				</div>
			</a>
    </section>;
  }
}

Promo.contextTypes = {
  router: React.PropTypes.func
};
