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

const convert = ({ type, props = {}, children = [] }) => {
  console.log(type, props, children);
  const $element = document.createElement(type);

  const attributes = mapPropsToAttributes(props);

  for (const [key, value, t] of attributes) {
    router($element, key, value, t);
  }

  for (const child of children) {
    $element.appendChild(
      typeof child === "object"
        ? convert(child)
        : document.createTextNode(child)
    );
  }

  return $element;
};

const reactDOM = (() => {
  let el = null;
  let cnt = null;
  let prev = null;

  const render = (element = el, container = cnt) => {
    el = element;
    cnt = container;

    const curr = element;

    // const diff = curr - prev;
    console.log("prev", prev);

    // render diff

    prev = curr;

    // eslint-disable-next-line no-param-reassign
    container.innerHTML = "";
    container.appendChild(convert(element()));
  };

  return { render };
})();

export default reactDOM;
