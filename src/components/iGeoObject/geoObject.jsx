'use strict';
import React from 'react';
import Actions from '../../actions/appViewActions.js';
import GOStore from '../../stores/geoObjectStore.js';
import GO from '../geoObject/geoObject.jsx';

function changeGO(id) {
  Actions.getGeoObject(id);
}

function getRouterParam(field) {
  return this.context.router.getCurrentParams()[field];
}

let GeoObject = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    let id = getRouterParam.call(this, 'goId');

    if(id){
      changeGO.call(this, id);
    }

    let store = GOStore.getGOStore();

    return {
      id: store.get('id') || null,
      go: store.get('go') || null
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    let newId = getRouterParam.call(this, 'goId');
    if(newId === this.state.id){
      return false;
    }

    // else
    changeGO.call(this, newId);

    return true;
  },

  componentDidMount: function() {
    GOStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    GOStore.removeChangeListener(this.onChange);
  },

  onChange() {
    let store = GOStore.getGOStore();
    this.setState({
      'id': store.get('id'),
      'go': store.get('go')
    });
  },

  render () {
    return <div className='geoObject'>
      <GO Data={this.state.go} />
    </div>;
  }
});

export default GeoObject;
