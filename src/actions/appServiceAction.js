import MapService from '../helpers/mapService.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

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

	renderActiveRoute(data, router) {
		let map = new MapService();
		let match = router.getCurrentPath();
		let params = {};

		if(match.match(/walk/) || match.match(/bus/)){
			params.routingMode = 'masstransit';
		}else{
			params.routingMode = 'auto';
		}

		if (data) {
			map.flushMapByGOName('multiRoute').renderRoute(data, params, (route) => {
				route.events.add('activeroutechange', function(){
						route.getRoutes().each((el) => {
							if(el.options.getName() !== 'activeRoute'){
								return;
							}
							// else
							Dispatcher.handleViewAction({
								data: el.properties.get('duration'),
								actionType: ActionTypes.ROUTE_SET_ACTIVE
							});

						});
					}
				);
			});
		} else {
			map.flushMapByGOName('multiRoute');
			if (__DEV__) {
				console.warn('empty route');
			}
		}
	},

	renderManyObjects(data) {
		data = data.split(',');
		let map = new MapService();
		let list = [];
		require('../helpers/globalData.js').Places.results.map((el) => {
			if(data.indexOf(el.id) !== -1){
				list.push(el);
			}
		});
		map.flushMap().renderGeoObjects(list);
		this.showTerminal(require('../helpers/globalData.js').Terminal);
	}
};
