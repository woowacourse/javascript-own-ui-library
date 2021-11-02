import { TEXT_NODE } from './constants/constant.js';
import { renderSubtreeIntoContainer } from './reactDOM.js';

export const createTextNode = value => {
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

  const childNodes = children.map(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return createTextNode(child);
    }

    return child;
  });

  return {
    type,
    props: {
      ...props,
      children: childNodes.length === 1 ? childNodes[0] : childNodes,
    },
  };
};

const useState = (() => {
  const state = [];
  let stateIndex = 0;
  let timerId = null;

  return initialState => {
    const currentIndex = stateIndex;

    stateIndex++;

    if (state[currentIndex] === undefined) {
      state[currentIndex] = initialState;
    }

    const setState = newState => {
      if (state[currentIndex] === newState) return;

      state[currentIndex] = newState;
      stateIndex = 0;

      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => renderSubtreeIntoContainer(), 0);
    };

    return [state[currentIndex], setState];
  };
})();

const React = {
  createElement,
  useState,
};

export default React;
