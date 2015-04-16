'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

var iState = null;
class RoutesStore extends Store {
  getState() {
    return iState;
  }
}

var timeStore = new RoutesStore();

timeStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.TIME:
      iState = action.data.unixtime;
      timeStore.emitChange();
      break;
  }

  return true;
});

export default timeStore;
