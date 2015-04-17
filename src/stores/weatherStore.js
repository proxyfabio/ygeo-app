'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

var iState = {
  temp: 0
};
class WeatherStore extends Store {
  getState() {
    return iState;
  }
}

var weatherStore = new WeatherStore();

weatherStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.WEATHER:
      iState.temp = action.data.temp;
      weatherStore.emitChange();
      break;
  }

  return true;
});

export default weatherStore;
