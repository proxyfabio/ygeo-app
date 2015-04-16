'use strict';
import MapService from '../utils/mapService.js';
import MarkService from '../utils/markService.js';
import routes from '../constants/routes.js';

export default class {
  constructor() {

    var Mark = new MarkService();
    Mark
      .setProvider(window.currentMap)
      .setSource(window.ymaps)
      .setEvents({
        'click,multitouchstart': function(e) {
          e.preventDefault();
          let target = e.originalEvent.target;
          location.hash = [routes.go, target.properties.get('id')].join('');
        }
      });

    var map = new MapService({
      Mark
    });
    map
      .setProvider(window.currentMap)
      .setSource(window.ymaps);

    return map;
  }
}