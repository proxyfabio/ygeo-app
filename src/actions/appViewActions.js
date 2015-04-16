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

  showActivegeoObjectsCollection: ActionCreator.create((data) => {
    Dispatcher.handleViewAction({
      id: data.id,
      actionType: ActionTypes.GO_GETACTIVECOLLECTION
    });
  })
};