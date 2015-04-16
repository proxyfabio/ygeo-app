'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';
import ICollection from './models/routes.js';

var iState = ICollection;
class RoutesStore extends Store {
  getState() {
    return iState;
  }
}

var routesStore = new RoutesStore();

routesStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.GO_GET:
      let data = action.data[0];

      // parse routes
      if (!data.routes) {
        if (__DEV__) {
          console.warn('routes !defined');
        }
        iState = iState.clear();
      } else {
        Object.keys(data.routes).map((key) => {
          if (key.match('route')) {
            iState = iState.set(key, data.routes[key].value);
          }
        });
      }

      break;
  }

  return true;
});

export default routesStore;
