import App from '../iApp/app.jsx';
import GeoObject from '../iGeoObject/geoObject.jsx';
import iSearch from '../iSearch/isearch.jsx';
import PromoPreview from '../PromoPreview/promoPreview.jsx';
import React from 'react';
import routeNames from '../../constants/routes.js';
import Router from 'react-router';
import Feedback from '../../components/Feedback/feedback.jsx';
import EEgg from '../../components/EasterEgg/easterEgg.jsx';

let goRoute = [routeNames.go, ':goId'].join('');
let promoRoute = [routeNames.promo, ':promoId'].join('');

let {Route} = Router;

export default (
  <Route name="app" path="/" handler={App}>
    <Route name='go' path={goRoute} handler={GeoObject}></Route>
    <Route name='route' path="/route/:rId"></Route>

    <Route name='search' path={routeNames.search} handler={iSearch}></Route>
    <Route name='searchMap' path="/map/:ids"></Route>
    <Route name='feedback' path="/feedback/" handler={Feedback}></Route>
    <Route name='egg' path="/egg/" handler={EEgg}></Route>

    <Route name='promo' path={promoRoute} handler={PromoPreview}></Route>
  </Route>
);
