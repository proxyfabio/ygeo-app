'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';
import SearchGOStore from './searchGeoObjectsStore.js';

var iState = '';
class SearchStore extends Store {
  getState() {
    return iState;
  }
}

var searchStore = new SearchStore();

searchStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.GO_SEARCH:
      Dispatcher.waitFor([SearchGOStore.dispatchToken]);
      iState = action.params.query;
      searchStore.emitChange();
      break;
  }

  return true;
});

export default searchStore;
