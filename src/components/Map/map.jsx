'use strict';
import './map.styl';
import React from 'react';

export default class Map extends React.Component{
  render(){
    let className = ['map__section', this.props.className].join(' ');
    return <figure className={className} id="map" />;
  }
}
