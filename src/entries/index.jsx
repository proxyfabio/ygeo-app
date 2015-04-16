'use strict'
import './index.styl'
import initMap from '../helpers/map.js'
import React from 'react'
import App from '../components/iApp/app.jsx'
import GeoObject from '../components/iGeoObject/geoObject.jsx'
import iRoute from '../components/iGeoObject/geoObject.jsx'
import Actions from '../actions/appViewActions.js'
import routeNames from '../constants/routes.js'
window.React = React;

import Router from 'react-router';
var {Link, DefaultRoute, Route, RouteHandler} = Router;

let goRoute = [routeNames.go,':goId'].join('');

var routes = <Route name="app" path="/" handler={App}>
  <Route name='go' path={goRoute} handler={GeoObject}></Route>
  <Route name='route' path="/route/:rId"></Route>
</Route>;

document.addEventListener('DOMContentLoaded', function(){
  import Data from '../helpers/globalData.js';

  // geoObjets rendering action
  ymaps.ready(function(){

    initMap(()=>{
      Actions.updateGeoObjectCollection(Data.Places.results);
    })

  });

  Router.run(routes, function (Handler) {
    React.render(<Handler {...Data} />, document.body);
  })
});
