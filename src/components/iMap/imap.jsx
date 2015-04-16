'use strict';
import {RouteHandler} from 'react-router';
import Actions from '../../actions/appServiceAction.js';
import ActiveGOStore from '../../stores/activeGeoObjectsStore.js';
import routesStore from '../../stores/routesStore.js';
import GOStore from '../../stores/geoObjectsStore.js';
import Map from '../Map/map.jsx';
import React from 'react';
import routeNames from '../../constants/routes.js';

function handleRoute(router, callback){
  let params = router.getCurrentParams();

  if(params.rId && router.getCurrentPath().match(routeNames.route)){
    callback();
  }
}

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
    console.log('change', this.context);
    Actions.renderGeoObjectCollection(ActiveGOStore.getState().toArray());
  },

  componentDidUpdate: function(prevProps, prevState) {
    // if route is handled
    handleRoute.call(this, this.context.router, () => {
      Actions.renderActiveRoute(routesStore.getState().get(this.context.router.getCurrentParams().rId));
    });
  },

  render(){
    let styles = 'map';
    let routerParams = this.context.router.getCurrentParams();
    let routerPath = this.context.router.getCurrentPath();

    if(routerParams.goId || routerPath.match('/search/')){
      styles += ' inactive';
    }

    return <section className={styles}>
      <Map/>
      <RouteHandler/>
    </section>;
  }
});
