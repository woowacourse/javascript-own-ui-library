import { TEXT_NODE } from './constants/constant.js';

const createDOMNode = (type, attrs) =>
  Object.entries(attrs).reduce(
    (node, [key, value]) => {
      node[key] = value;

      return node;
    },
    type === TEXT_NODE
      ? document.createTextNode('')
      : document.createElement(type)
  );

const mountToDOM = (element, container) => {
  if (
    !element ||
    typeof element === 'boolean' ||
    !element?.type ||
    !element?.props
  )
    return;

  const {
    type,
    props: { children, ...attrs },
  } = element;

  const DOMNode = createDOMNode(type, attrs);

  container.append(DOMNode);

  if (Array.isArray(children)) {
    children.forEach(child => mountToDOM(child, DOMNode));
  } else {
    mountToDOM(children, DOMNode);
  }
};

export const renderSubtreeIntoContainer = (() => {
  let _root = null;
  let _element = null;
  let _latestVNode = null;

  return (element, container) => {
    if (container) {
      _root = container;
      _element = element;
    }

    _latestVNode = typeof _element === 'function' ? _element() : _element;

    _root.innerHTML = '';
    mountToDOM(_latestVNode, _root);
  };
})();

const render = (element, container) => {
  if (!container instanceof HTMLElement) {
    throw new Error('Target container is not a DOM element.');
  }

  renderSubtreeIntoContainer(element, container);
};

const ReactDOM = {
  render,
};

export default ReactDOM;
