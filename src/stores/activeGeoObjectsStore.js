'use strict';
import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';
import ICollection from './models/activeGeoObjects.js';
import GOCollectionStore from './geoObjectsStore.js';

var iState = ICollection;
class ActiveGeoObjectsStore extends Store {
  getState() {
    return iState;
  }
}

var activeGOCollectionStore = new ActiveGeoObjectsStore();

activeGOCollectionStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;

  switch (action.actionType) {

    case ActionTypes.GO_GETACTIVECOLLECTION:
      // flush
      iState = iState.clear();

      // iterate
      GOCollectionStore.getState().map((el) => {
        // add new
        if (action.list.indexOf(el.category_id) !== -1) {
          iState = iState.push(el);
        }
      });

      activeGOCollectionStore.emitChange();
      break;
  }

  return true;
});

export default activeGOCollectionStore;
