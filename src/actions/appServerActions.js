'use strict';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

export default {
  getGeoObject(data) {
    Dispatcher.handleServerAction({
      data: data.results,
      actionType: ActionTypes.GO_GET
    });
  },

  didSearchGeoObjects(data) {
    Dispatcher.handleServerAction({
      data: data.results,
      actionType: ActionTypes.GO_SEARCH
    });
  }
};
