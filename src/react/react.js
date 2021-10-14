import { TEXT_NODE } from './constants/constant.js';
import { renderSubtreeIntoContainer } from './reactDOM.js';

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

//TODO: useState에서 다수의 상태를 다룰 수 있도록 변경
const useState = (() => {
  let state = null;

  const setState = newState => {
    state = newState;
    renderSubtreeIntoContainer();
  };

  return initialState => {
    if (!state) {
      state = initialState;
    }

    return [state, setState];
  };
})();

const React = {
  createElement,
  useState,
};

export default React;
