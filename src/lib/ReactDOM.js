/* eslint-disable no-param-reassign */
import { throwError } from "../util/error.js";

const DICT = {
  className: "class",
};

const table = {
  attr($element, key, value) {
    $element.setAttribute(key, value);
    return $element;
  },
  event($element, key, value) {
    // eslint-disable-next-line no-param-reassign
    $element[key] = value;
    return $element;
  },
};

const router = ($element, key, value, type) =>
  table[type]?.($element, key, value) ??
  throwError(`Invalid type: ${key} ${value} ${type}`);

const mapPropsToAttributes = (props) => {
  const attributes = [];

  for (const [key, value] of Object.entries(props)) {
    if (/^on/.test(key)) {
      attributes.push([key.toLowerCase(), value, "event"]);
    } else {
      attributes.push([key in DICT ? DICT[key] : key, value, "attr"]);
    }
  }

  return attributes;
};

const convert = (vnode) => {
  const { type, props = {}, children = [], value } = vnode;
  console.log(type, props, children);

  const rnode =
    type === Symbol.for("textNode")
      ? document.createTextNode(value)
      : document.createElement(type);

  for (const attribute of mapPropsToAttributes(props)) {
    router(rnode, ...attribute);
  }

  for (const child of children) {
    rnode.appendChild(convert(child));
  }

  vnode.ref = rnode;

  return rnode;
};

const reactDOM = (() => {
  let el = null;
  let cnt = null;
  let prev = null;
  let rdom = null;

  const render = (element = el, container = cnt) => {
    el = element;
    cnt = container;
    console.log("prev", prev);

    const curr = element();
    rdom = convert(curr);

    container.innerHTML = "";
    container.appendChild(rdom);

    // preserve curr
    prev = curr;
  };

  return { render };
})();

export default reactDOM;
