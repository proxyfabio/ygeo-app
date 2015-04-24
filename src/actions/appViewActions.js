'use strict';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';
import ActionCreator from '../core/action.js';
import API from '../utils/api.js';

export default {
  updateGeoObjectCollection: ActionCreator.create(function(data) {
    // stream data to the store
    Dispatcher.handleViewAction({
      data: data,
      actionType: ActionTypes.GO_UPDATECOLLECTION
    });
  }),

  getGeoObject: ActionCreator.create(function(id) {
    let Env = require('../helpers/globalData.js');
    API.getGeoObject({
      id: id,
      appId: Env.AppId
    });
  }),

  searchGeoObject: ActionCreator.create(function(query) {
    API.searchGeoObject(query);
  }),

  showActivegeoObjectsCollection: ActionCreator.create((data) => {
    Dispatcher.handleViewAction({
      list: data.list,
      actionType: ActionTypes.GO_GETACTIVECOLLECTION
    });
  }),

  getTime: ActionCreator.create(function() {
    API.getTime();
  }),

  getWeather: ActionCreator.create(function() {
    API.getWeather();
  }),

  getBanner: ActionCreator.create(function (params) {
    API.getBannerById(params);
  }),

  getActualBanner: ActionCreator.create(function(params) {
    API.getBanner(params);
  }),

  switchGallery: ActionCreator.create(function(params) {
    Dispatcher.handleViewAction({
      data: params,
      actionType: ActionTypes.CHANGE_SLIDER_MEDIATYPE
    });
  })
};
