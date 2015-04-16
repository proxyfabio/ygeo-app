'use strict';

import Store from '../core/store.js'
import Dispatcher from '../core/dispatcher.js'
import ActionTypes from '../constants/actions.js'
import ICollection from './models/geoObjects.js'

var iState = ICollection;
class GeoObjectsStore extends Store {
  getState() {
    return iState;
  }
}

var GOStore = new GeoObjectsStore();

GOStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.GO_UPDATECOLLECTION:
      action.data.map((el) => {
        iState = iState.push(el);
      });

      GOStore.emitChange();
      break;
  }

  return true;
});

export default GOStore
