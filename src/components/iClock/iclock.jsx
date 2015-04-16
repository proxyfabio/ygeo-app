import React from 'react';
import Actions from '../../actions/appViewActions.js';
import timeStore from '../../stores/timeStore.js';

export class Clock extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      unixtime: (new Date()).getTime()
    };

    setInterval(() => {
      Actions.getTime();
    }, this.props.Interval);
  }

  parseUnixTime(time){
    return (new Date(time)).toLocaleTimeString().replace(/:\d*$/, '');
  }

  componentWillMount() {
    timeStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    timeStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      unixtime: timeStore.getState()
    });
  }

  render(){
    return <div className="clock">{this.parseUnixTime(this.state.unixtime)}</div>;
  }
}
