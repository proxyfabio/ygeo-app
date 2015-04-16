import App from '../iApp/app.jsx';
import GeoObject from '../iGeoObject/geoObject.jsx';
import iSearch from '../iSearch/isearch.jsx';
import React from 'react';
import routeNames from '../../constants/routes.js';
import Router from 'react-router';

let goRoute = [routeNames.go, ':goId'].join('');

let {Route} = Router;

export default (
  <Route name="app" path="/" handler={App}>
    <Route name='go' path={goRoute} handler={GeoObject}></Route>
    <Route name='route' path="/route/:rId"></Route>

    <Route name='search' path={routeNames.search} handler={iSearch}></Route>
  </Route>
);
