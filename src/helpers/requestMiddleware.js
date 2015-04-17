'use strict';
export default {
  parseXHRResponse(responseHandler){
    return (err, resp) => {
      let {
        status, statusText, text
      } = resp;

      if (err && __DEV__) {
        console.warn(err);
      }

      if (status === 200 && statusText === 'OK') {
        resp = JSON.parse(text);
        responseHandler({resp});
      }

    };
  }
};
