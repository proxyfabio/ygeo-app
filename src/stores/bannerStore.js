'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

var iState = {};
class BannerStore extends Store {
  getState() {
    return iState;
  }
}

var bannerStore = new BannerStore();

bannerStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.BANNER:
			iState = action.data[0];
      bannerStore.emitChange();
      break;
  }

  return true;
});

export default bannerStore;
