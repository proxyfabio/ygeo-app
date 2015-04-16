import MapService from '../helpers/mapService.js';


export default {
  renderGeoObjectCollection(data) {
    let map = new MapService();
    map.flushMap().renderGeoObjects(data);
  },

  renderActiveRoute(data) {
    let map = new MapService();
    if(data){
      map.flushMapByGOName('multiRoute').renderRoute(data);
    }else{
      map.flushMapByGOName('multiRoute');
      if(__DEV__){
        console.warn('empty route');
      }
    }
  }
};
