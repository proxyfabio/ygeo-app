function isFunction (argument) {
  return typeof argument === 'function';
}

export default {
  create(handler){
    return function action(data) {
      if(isFunction(handler)){
        return handler(data);
      }
      // else
      return data;
    };
  }
}
