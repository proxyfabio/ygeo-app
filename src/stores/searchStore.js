'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

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

    case ActionTypes.KEYBOARD_CLICKBUTTON:

			switch(action.data.char){
				case 8:
					iState = '';
					break;
				case 32:
					iState += ' ';
					break;
				case 13:
					iState += String.fromCharCode(13);
					break;
				default:
					iState += String.fromCharCode(action.data.char);
					break;
			}

      searchStore.emitChange();
      break;
  }

  return true;
});

export default searchStore;
