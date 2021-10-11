import { FRAGMENT, TEXT_NODE } from "./constants/broc.js";

const createChildren = (children) =>
  children
    .filter((child) => child !== undefined && child !== null && typeof child !== "boolean")
    .reduce((fixedChildren, child) => {
      if (Array.isArray(child)) {
        return [...fixedChildren, ...createChildren(child)];
      }

      return [...fixedChildren, child?.type ? child : createTextNode(child)];
    }, []);

const createElement = (type, props = {}, ...children) => {
  if (typeof type !== "string" && typeof type !== "function") {
    throw TypeError("Invalid parameter. 'type' is expected to be 'string' or 'function'.");
  }

  if (typeof props !== "object") {
    throw TypeError("Invalid parameter. 'props' is expected to be 'object'.");
  }

  return {
    type,
    props: {
      ...props,
      children: createChildren(children),
    },
  };
};

const createTextNode = (value) => createElement(TEXT_NODE, { value });

const createFragment = (...children) => createElement(FRAGMENT, null, ...children);

export const stateController = (() => {
  const states = [];
  let stateIndex = 0;
  let renderer = null;

  return {
    getStateIndex() {
      return stateIndex;
    },

    getStateByIndex(index) {
      return states[index];
    },

    getStatesLength() {
      return states.length;
    },

    setState(index, value) {
      states[index] = value;
    },

    isStatesLengthNormal() {
      return states.length >= stateIndex;
    },

    reset(newRenderer) {
      stateIndex = 0;
      renderer = newRenderer;
    },

    render() {
      renderer();
    },
  };
})();

const useState = (initialState) => {
  if (!stateController.isStatesLengthNormal()) {
    throw Error("states control error");
  }

  const currentIndex = stateController.getStateIndex();

  if (stateController.getStatesLength() === currentIndex) {
    stateController.setState(currentIndex, initialState ?? null);
  }

  const setState = (newState) => {
    stateController.setState(
      currentIndex,
      typeof newState === "function" ? newState(stateController.getStateByIndex(currentIndex)) : newState
    );

    stateController.render();
  };

  return [stateController.getStateByIndex(currentIndex), setState];
};

const Broc = { createElement, createFragment, createTextNode, useState };

export default Broc;
