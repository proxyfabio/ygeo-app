import helpers from '../helpers/pathHelpers.js';

export default class markService {
  constructor() {
    this.provider = null;
    this.source = null;
    this.events = null;
  }

  setProvider(provider) {
    this.provider = provider;
    return this;
  }

  setSource(source) {
    this.source = source;
    return this;
  }

  setEvents(list) {
    this.events = {};
    Object.keys(list).map((el) => {
      this.events[el] = list[el];
    }, this);
    return this;
  }

  getMark(data) {
    if (!this.provider || !this.source) {
      if (__DEV__) {
        console.warn('markService provider/source !defined');
      }
    }

    if (!data.coordinates) {
      if (__DEV__) {
        console.warn('coordinates !defined');
      }
    } else {
      let Mark = new this.source.Placemark(data.coordinates.split(','), this.prepareProps(data), this.prepareOptions(data));
      if(this.events){
        Object.keys(this.events).map((el) => {
          Mark.events.add(el.split(','), this.events[el]);
        });
      }
      return Mark;
    }

    return null;
  }

  prepareProps(data) {
    return {
      id: data.id
    };
  }

  prepareOptions(data) {

    let size, offset;
    if (!data.icon || !data.icon.match(/active.*$/)) {
      size = [32, 32];
      offset = [-18, -26];
    } else {
      size = [48, 72];
      offset = [-24, -31];
    }

    return {
      iconLayout: 'default#image',
      iconImageHref: helpers.getImageUrl(data.icon),
      iconImageSize: size,
      iconImageOffset: offset,
      clusterCaption: data.address
    };
  }

}
