import render from "./render.js";

const store = (initialState, Element) => {
  return new Proxy(initialState, {
    get: function (target, key) {
      return target[key];
    },
    set: function (target, key, value) {
      target[key] = value;
      render(Element());
      return true;
    },
  });
};

export default store;
