import { TEXT_NODE } from './constants/constant.js';

const shouldUpdateNode = (oldNode, newNode) => {
  return true;
  // if (!oldNode) return true;

  // if (oldNode.type !== newNode.type) {
  //   return true;
  // }

  // const oldNodeAttrs = Object.entries(oldNode.props).map(([key, value]) =>
  //   key === 'children' ? '' : value
  // );
  // const newNodeAttrs = Object.entries(newNode.props).map(([key, value]) =>
  //   key === 'children' ? '' : value
  // );

  // if (oldNodeAttrs.some((attr, index) => attr !== newNodeAttrs[index])) {
  //   return true;
  // }

  // return false;
};

const mountToDOM = (latestNode, newNode, container) => {
  if (!newNode?.type || !newNode?.props) return;

  const {
    type,
    props: { children, ...attrs },
  } = newNode;

  const DOMNode = Object.entries(attrs).reduce(
    (node, [key, value]) => {
      node[key] = value;

      return node;
    },
    type === TEXT_NODE
      ? document.createTextNode('')
      : document.createElement(type)
  );

  if (shouldUpdateNode(latestNode, newNode)) {
    container.append(DOMNode);
  }

  if (Array.isArray(children)) {
    children.forEach((child, index) =>
      mountToDOM(latestNode?.props?.children[index], child, DOMNode)
    );
  } else {
    mountToDOM(latestNode?.props?.children, children, DOMNode);
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

    const newNode = typeof _element === 'function' ? _element() : _element;

    _root.innerHTML = '';
    mountToDOM(_latestVNode, newNode, _root);

    _latestVNode = newNode;
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
