import MapService from '../helpers/mapService.js';

export default {
  renderGeoObjectCollection(data) {
    let map = new MapService();
    map
      .flushMap()
      .renderGeoObjects(data);
  }
};