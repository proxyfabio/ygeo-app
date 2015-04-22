'use strict';
export default function(callback) {

  function getMap() {
    window.currentMap = new ymaps.Map('map', {
      center: [56.337042, 36.725815],
      zoom: 13,
      controls: [
        'zoomControl'
      ]
    }, {
      adjustZoomOnTypeChange: true,
      restrictMapArea: true
    });
    return window.currentMap;
  }

  getMap().container.fitToViewport();

  callback();
}
