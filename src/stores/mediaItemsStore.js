'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';
import ICollection from './models/mediaItems.js';

var mode = 'photo';
var iState = ICollection;
class MediaItemsStore extends Store {
	getState() {
		return iState;
	}

	getItem(id) {
		return iState.get(id)[mode];
	}

	getMode() {
    return mode;
	}

	parseGeoObjectMedia(data) {
		// flush the store
		iState = iState.clear();
		data.map((el) => {
			this.saveMediaItems(el);
		}, this);
	}

	saveMediaItems(el) {
		let photo = this.parseMediaItems('photos', 'image', el.tvs);
		let video = this.parseMediaItems('videos', 'url', el.tvs);

		iState = iState.set(el.id, {
			video, photo
		});
	}

	parseMediaItems(key, name, data) {
		if (!data) {
			return [];
		}
		// else
		let json = data[key];
		if (!json) {
			return [];
		}
		// else
		return JSON.parse(json).map((el) => {
			let type;
			let value = el[name];

			switch (name) {
				case 'url':

          if(value.match(/vimeo/)){
            type = 'vimeo';
          }else{
            type = 'youtube';
          }

					break;
				default:
					type = 'image';
					break;
			}
			return {
				type, value
			};
		});
	}

}

var mediaItemsStore = new MediaItemsStore();

mediaItemsStore.dispatchToken = Dispatcher.register(function(payload) {
	let action = payload.action;
	switch (action.actionType) {
		case ActionTypes.GO_UPDATECOLLECTION:
			// flush the store
			// iState = iState.clear();
			// action.data.map((el) => {
			//   mediaItemsStore.saveMediaItems(el);
			// });

			// mediaItemsStore.emitChange();
			break;

		case ActionTypes.GO_GET:
			mediaItemsStore.parseGeoObjectMedia(action.data);
			mediaItemsStore.emitChange();
			break;

		case ActionTypes.CHANGE_SLIDER_MEDIATYPE:
			mode = action.data;
			mediaItemsStore.emitChange();
			break;

	}

	return true;
});

export default mediaItemsStore;
