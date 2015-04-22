import MapService from '../helpers/mapService.js';

export default {
	renderGeoObjectCollection(data) {
    let map = new MapService();

		map.flushMap();
    this.showTerminal(require('../helpers/globalData.js').Terminal);
    map.renderGeoObjects(data);
	},

  showTerminal(data){
    let map = new MapService();

		map.renderGO({
			id: 0,
			coordinates: data.coords,
			icon: data.icon,
      disallowEvents: true
		});
  },

	renderActiveRoute(data) {
		let map = new MapService();
		if (data) {
			map.flushMapByGOName('multiRoute').renderRoute(data);
		} else {
			map.flushMapByGOName('multiRoute');
			if (__DEV__) {
				console.warn('empty route');
			}
		}
	}
};
