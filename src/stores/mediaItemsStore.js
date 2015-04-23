'use strict';

import Store from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';
import ICollection from './models/mediaItems.js';

var lastId = 0;
var mode = 'photo';
var activeVideo = 1;
var activePhoto = 1;
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

	getActive(type) {
		return type === 'video' ? activeVideo : activePhoto;
	}

	parseGeoObjectMedia(data) {
		data.map((el) => {
			// flush the store
			if(lastId !== el.id){
				iState = iState.clear();
				mode = 'photo';
				activeVideo = 1;
				activePhoto = 1;
				lastId = el.id;
			}

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

		case ActionTypes.GO_GET:
			mediaItemsStore.parseGeoObjectMedia(action.data);
			mediaItemsStore.emitChange();
			break;

		case ActionTypes.CHANGE_SLIDER_MEDIATYPE:
			mode = action.data.type;
			if(mode === 'video'){
				activeVideo = action.data.active;
			}else{
				activePhoto = action.data.active;
			}
			mediaItemsStore.emitChange();
			break;

	}

	return true;
});

export default mediaItemsStore;
