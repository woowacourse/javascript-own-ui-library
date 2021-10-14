import { TEXT_NODE } from './constants/constant.js';

const mountToDOM = (element, container) => {
  if (typeof element === 'boolean' || !element) return;

  if (!element?.type || !element?.props) {
    container.append(element);

    return;
  }

  const {
    type,
    props: { children, ...attrs },
  } = element;

  const node = Object.entries(attrs).reduce(
    (node, [key, value]) => {
      node[key] = value;

      return node;
    },
    type === TEXT_NODE
      ? document.createTextNode('')
      : document.createElement(type)
  );

  container.append(node);

  if (Array.isArray(children)) {
    children.forEach(child => mountToDOM(child, node));
  } else {
    mountToDOM(children, node);
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

// diff
// 1. mountToDOM(oldNode, newNode, container)
// 2. newNode && shouldUpdate(oldNode, newNode) -> 업데이트
// 3. _latestVNode = newNode;
