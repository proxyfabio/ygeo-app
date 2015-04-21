import React from 'react';
import Actions from '../../actions/appViewActions.js';
import weatherStore from '../../stores/weatherStore.js';

export default class IWeather extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      temp: 0,
      measure: '°'
    };

    Actions.getWeather();
    setInterval(() => {
      Actions.getWeather();
    }, this.props.Interval);
  }

  componentWillMount() {
    weatherStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    weatherStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      temp: weatherStore.getState().temp
    });
  }

  render(){
    return <div className={this.props.className}>{[this.state.temp > 0 ? '+' : '', this.state.temp, this.state.measure].join('')}</div>;
  }
}

IWeather.propTypes = {
  Interval: React.PropTypes.number
};
