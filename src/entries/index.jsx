'use strict';
import './index.styl';
import initMap from '../helpers/map.js';
import React from 'react';
import Router from 'react-router';
import iRoute from '../components/iGeoObject/geoObject.jsx';
import Actions from '../actions/appViewActions.js';
import ServiceActions from '../actions/appServiceAction.js';
import Routes from '../components/iRouter/irouter.jsx';
window.React = React;

document.addEventListener('DOMContentLoaded', function(){
  import Data from '../helpers/globalData.js';

  // geoObjets rendering action
  ymaps.ready(function(){

    initMap(() => {
      Actions.updateGeoObjectCollection(Data.Places.results);
      ServiceActions.showTerminal(Data.Terminal);
    })

  });

  Router.run(Routes, function (Handler) {
    React.render(<Handler {...Data} />, document.body);
  })
});
