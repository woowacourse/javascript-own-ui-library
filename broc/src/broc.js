import { EMPTY_ELEMENT, FRAGMENT, TEXT_NODE } from "./constants/broc.js";

const createChildren = (children) =>
  children.reduce((fixedChildren, child) => {
    if (child === undefined || child === null || typeof child === "boolean") {
      return [...fixedChildren, createEmptyElement()];
    }

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

const createEmptyElement = () => createElement(EMPTY_ELEMENT);

export const stateController = (() => {
  const renderer = new Map();
  const states = [];
  let stateIndex = 0;
  let currentContainerId = "";

  return {
    getStateIndex() {
      return stateIndex;
    },

    getStateByIndex(index) {
      return states[index];
    },

    getRenderId() {
      return currentContainerId;
    },

    getStatesLength() {
      return states.length;
    },

    setState(index, value) {
      states[index] = value;
    },

    setStateIndexToNext() {
      stateIndex++;
    },

    isStatesLengthNormal() {
      return states.length >= stateIndex;
    },

    reset(containerId) {
      stateIndex = 0;
      currentContainerId = containerId;
    },

    registerRenderer(newRenderer) {
      renderer.set(currentContainerId, newRenderer);
    },

    render(id) {
      renderer.get(id)?.();
      stateIndex = 0;
    },
  };
})();

const useState = (initialState) => {
  if (!stateController.isStatesLengthNormal()) {
    throw Error("states control error");
  }

  const currentIndex = stateController.getStateIndex();
  const currentRenderId = stateController.getRenderId();

  if (stateController.getStatesLength() === currentIndex) {
    stateController.setState(currentIndex, initialState ?? null);
  }

  const setState = (newState) => {
    const _newState =
      typeof newState === "function" ? newState(stateController.getStateByIndex(currentIndex)) : newState;

    if (stateController.getStateByIndex(currentIndex) !== _newState) {
      stateController.setState(currentIndex, _newState);
      stateController.render(currentRenderId);
    }
  };

  stateController.setStateIndexToNext();

  return [stateController.getStateByIndex(currentIndex), setState];
};

const Broc = { createElement, createFragment, createTextNode, useState };

export default Broc;
