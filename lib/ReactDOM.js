const throwError = (message) => {
  throw new Error(message);
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

const dict = {
  className: "class",
};

const mapPropsToAttributes = (props) => {
  const attributes = [];

  for (const [key, value] of Object.entries(props)) {
    if (/^on/.test(key)) {
      attributes.push(key.toLowerCase(), value, "event");
    } else {
      attributes.push(key in dict ? dict[key] : key, value, "attr");
    }
  }

  return attributes;
};

const create = ({ type, props = {}, children = [] }) => {
  const $element = document.createElement(type);

  const attributes = mapPropsToAttributes(props);

  for (const [key, value, t] of attributes) {
    router($element, key, value, t);
  }

  for (const child of children) {
    $element.appendChild(
      typeof child === "object" ? create(child) : document.createTextNode(child)
    );
  }

  return $element;
};

const render = (element, container) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = "";
  container.appendChild(create(element()));
};

const ReactDOM = {
  render,
};

export default ReactDOM;
