import React from 'react';
import routeStore from '../../stores/routesStore.js';
import './routeInformer.styl';

export default class RouteInformer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			duration: null
		};
	}

	componentWillMount() {
		routeStore.addChangeListener(this.onChange.bind(this));
	}

	componentWillUnmount() {
		routeStore.removeChangeListener(this.onChange.bind(this));
	}

	onChange() {
		this.setState({
			duration: routeStore.getDuration().text
		});
	}

	render() {
		let info = '';
		if(this.state.duration){
			info = <div className="routeInfo__title">Время в пути: <span className="routeInfo__distance">{this.state.duration}</span></div>;
		}
		return <div className={this.props.className}>{info}</div>;
	}
}
