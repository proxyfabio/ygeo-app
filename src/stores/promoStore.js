'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

var iState = {};
class PromoStore extends Store {
  getState() {
    return iState;
  }
}

var promoStore = new PromoStore();

promoStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.BANNER_BY_ID:
			iState = action.data[0];
      promoStore.emitChange();
      break;
  }

  return true;
});

export default promoStore;
