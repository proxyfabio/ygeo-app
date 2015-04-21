'use strict';
import Actions from '../../actions/appServiceAction.js';
import ActiveGOStore from '../../stores/activeGeoObjectsStore.js';
import Map from '../Map/map.jsx';
import React from 'react';
import Promo from '../Banner/banner.jsx';

import routeNames from '../../constants/routes.js';
import routesStore from '../../stores/routesStore.js';

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
    Actions.renderGeoObjectCollection(ActiveGOStore.getState().toArray());
  },

  componentDidUpdate: function(prevProps, prevState) {
    // if route is handled
    handleRoute.call(this, this.context.router, () => {
      Actions.renderActiveRoute(routesStore.getState().get(this.context.router.getCurrentParams().rId));
    });
  },

  render(){
    let styles;
    let routerParams = this.context.router.getCurrentParams();
    let routerPath = this.context.router.getCurrentPath();

    if(routerParams.goId || routerPath.match('/search/')){
      styles = 'map__section--inactive';
    }

    return <section className="map">
      <Map className={styles}/>
      <Promo/>
    </section>;
  }
});
