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
    let store = GOStore.getGOStore();
    return {
      id: store.get('id') || null,
      go: store.get('go') || null
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.id === nextState.id){
      changeGO.call(this, getRouterParam.call(this, 'goId'));
      return false;
    }
    return true;
  },

  componentDidMount: function() {
    let nextId = getRouterParam.call(this, 'goId');
    if(nextId && nextId !== this.state.id){
      changeGO.call(this, nextId);
    }

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
    return <section className='geoObject'>
      <GO Data={this.state.go} />
    </section>;
  }
});

export default GeoObject;
