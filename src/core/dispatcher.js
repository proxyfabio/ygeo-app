'use strict';

import { Dispatcher } from 'flux';
import payloadSources from '../constants/payloadSources.js';

function handleAction(action, source) {
  let payload = {
    source: payloadSources[source],
    action: action
  };
  return this.dispatch(payload);
}

Dispatcher.prototype.handleServerAction = function(action) {
  return handleAction.call(this, action, 'SERVER_ACTION');
};

Dispatcher.prototype.handleViewAction = function(action) {
  return handleAction.call(this, action, 'VIEW_ACTION');
};

export default new Dispatcher();
