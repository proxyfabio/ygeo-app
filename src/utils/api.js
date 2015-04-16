import Env from '../constants/env.js';
import xhr from 'superagent';
import ServerActions from '../actions/appServerActions.js';
export default {
  getGeoObject(params) {
    params.pub_action = 'go/getdata';

    xhr('post', Env.connectors)
      .type('form')
      .send(params)
      .end(function(err, res) {
        let {
          status, statusText, text
        } = res;

        if (err && __DEV__) {
          console.warn(err);
        }

        if (status === 200 && statusText === 'OK') {
          let resp = JSON.parse(text);
          ServerActions.getGeoObject(resp);
        }
      });
  },

  searchGeoObject(params) {

    params.pub_action = 'go/search';

    xhr('post', Env.connectors)
      .type('form')
      .send(params)
      .end(function(err, res) {
        let {
          status, statusText, text
        } = res;

        if (err && __DEV__) {
          console.warn(err);
        }

        if (status === 200 && statusText === 'OK') {
          let resp = JSON.parse(text);
          ServerActions.didSearchGeoObjects(resp);
        }
      });
  }
};
