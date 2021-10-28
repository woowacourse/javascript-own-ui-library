/* eslint-disable no-param-reassign */
import { throwError } from "../util/error.js";

const DICT = {
  className: "class",
};

const setTable = {
  attr($element, key, value) {
    $element.setAttribute(key, value);
    return $element;
  },
  event($element, key, value) {
    $element[key] = value;
    return $element;
  },
};

const removeTable = {
  attr($element, key) {
    $element.removeAttribute(key);
    return $element;
  },
  event($element, key) {
    $element[key] = null;
    return $element;
  },
};

export const setAttribute = ($element, key, value, type) =>
  setTable[type]?.($element, key, value) ??
  throwError(`Invalid type: ${$element} ${key} ${value} ${type} `);

export const removeAttribute = ($element, key, value, type) =>
  removeTable[type]?.($element, key, value) ??
  throwError(`Invalid type: ${$element} ${key} ${value} ${type} `);

export const mapPropToAttribute = (key, value) => {
  if (/^on/.test(key)) {
    return [key.toLowerCase(), value, "event"];
  }

  return [key in DICT ? DICT[key] : key, value, "attr"];
};

export const mapPropsToAttributes = (props) =>
  Object.entries(props).map(([key, value]) => mapPropToAttribute(key, value));
