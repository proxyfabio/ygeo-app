'use strict';
import {RouteHandler} from 'react-router';
import Actions from '../../actions/appServiceAction.js';
import ActiveGOStore from '../../stores/activeGeoObjectsStore.js';
import GOStore from '../../stores/geoObjectsStore.js';
import Map from '../Map/map.jsx';
import React from 'react';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillMount() {
    ActiveGOStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    ActiveGOStore.removeChangeListener(this.onChange);
  },

  onChange() {
    Actions.renderGeoObjectCollection(ActiveGOStore.getState().toArray());
  },

  render(){
    let styles = 'map';

    if(this.context.router.getCurrentParams().goId){
      styles += ' inactive';
    }

    return <section className={styles}>
      <Map/>
      <RouteHandler/>
    </section>;
  }
});
