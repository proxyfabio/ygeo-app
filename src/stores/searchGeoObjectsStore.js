'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';
import ICollection from './models/geoObjects.js';

var iState = ICollection;
class SearchStore extends Store {
  getState() {
    return iState;
  }
}

var searchGeoObjectsStore = new SearchStore();

searchGeoObjectsStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.GO_SEARCH:
      let data = action.data;
      iState = iState.clear();

      if (data) {
        data.map((el) => {
          iState = iState.push({
            text: el.pagetitle,
            id: el.id
          });
        });
      }

      searchGeoObjectsStore.emitChange();
      break;
  }

  return true;
});

export default searchGeoObjectsStore;
