'use strict';

import Store from '../core/store.js'
import Dispatcher from '../core/dispatcher.js'
import ActionTypes from '../constants/actions.js'
import i from 'immutable'

var iStore = new (i.Record({go: null, id: null}))();

class CartStore extends Store{
  getGOStore(){
    return iStore;
  }
}

var cartStore = new CartStore();

cartStore.dispatchToken = Dispatcher.register(function(payload) {
  let action = payload.action;
  switch (action.actionType) {

    case ActionTypes.GO_GET:
      iStore = iStore
        .set('go', action.data[0])
        .set('id', action.data[0].id);

      cartStore.emitChange();
      break;
  }

  return true;
});

export default cartStore
