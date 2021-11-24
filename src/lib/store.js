const store = (initialState, handler) => {
  return new Proxy(initialState, {
    get: function (target, key) {
      return target[key];
    },
    set: function (target, key, value) {
      target[key] = value;
      handler();
      return true;
    },
  });
};

export default store;
