import { TEXT_NODE } from './constants/constant.js';
import ReactDOM from './reactDOM.js';

export const useState = (() => {
  let state = null;

  const setState = newState => {
    state = newState;
    ReactDOM.render();
  };

  return initialState => {
    if (!state) {
      state = initialState;
    }

    return [state, setState];
  };
})();

const createTextNode = value => {
  return {
    type: TEXT_NODE,
    props: {
      nodeValue: value,
    },
  };
};

const createElement = (type, props, ...children) => {
  if (children.length === 0)
    return {
      type,
      props,
    };

  const childNodes = children.map(child =>
    typeof child === 'string' || typeof child === 'number'
      ? createTextNode(child)
      : child
  );

  return {
    type,
    props: {
      ...props,
      children: childNodes.length === 1 ? childNodes[0] : childNodes,
    },
  };
};

const React = {
  createElement,
  createTextNode,
};

export default React;
