import render from "../utils/render";

const $root = document.getElementById("root");

const proxy = (initialState, Element) => {
  return new Proxy(initialState, {
    get: function (target, key) {
      return target[key];
    },
    set: function (target, key, value) {
      target[key] = value;
      render($root, Element());

      return true;
    },
  });
};

export default proxy;
