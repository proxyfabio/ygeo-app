'use strict';
import React from 'react';
import Actions from '../../actions/appViewActions.js';
import GOStore from '../../stores/geoObjectStore.js';
import GO from '../geoObject/geoObject.jsx';
import mediaItemsStore from '../../stores/mediaItemsStore.js';

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
    let state = GOStore.getState();
    return {
      id: Number(state.get('id')),
      go: state.get('go')
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.id !== nextState.id){
      changeGO.call(this, nextState.id);
      return false;
    }
    return true;
  },

  componentDidMount: function() {
    let nextId = getRouterParam.call(this, 'goId');
    if(nextId && nextId !== this.state.id){
      changeGO.call(this, nextId);
    }
  },

  componentWillMount: function() {
    mediaItemsStore.addChangeListener(this.onChange);
    GOStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    mediaItemsStore.removeChangeListener(this.onChange);
    GOStore.removeChangeListener(this.onChange);
  },

  onChange() {
    let store = GOStore.getGOStore();
    this.setState({
      id: Number(store.get('id')),
      go: store.get('go')
    });
  },

  render () {
    return <section className='geoObject'>
      <GO
        Data={this.state.go}
        media={mediaItemsStore.getState()}
        mode={mediaItemsStore.getMode()}
        activePhoto={mediaItemsStore.getActive('photo')}
        activeVideo={mediaItemsStore.getActive('video')}
        />
    </section>;
  }
});

export default GeoObject;
