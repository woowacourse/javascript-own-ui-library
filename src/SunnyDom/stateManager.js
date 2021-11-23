/*
 * @params
 * default: object,
 * renderer: function
 */

const stateManager = (defaultState, renderer) => {
  return new Proxy(defaultState, {
    get: function (target, prop) {
      return target[prop];
    },
    set: function (target, prop, value) {
      target[prop] = value;
      renderer();

      return true;
    },
  });
};

export default stateManager;
