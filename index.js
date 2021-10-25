import { render } from './renderer.js';
import { parse } from './parser.js';
import { getCounterTemplate } from './template.js';
import { DATE_OF_GRADUATION_CEREMONY, ERROR_MESSAGE, COUNT_VALUE } from './constants.js';

let state = {
  count: DATE_OF_GRADUATION_CEREMONY - 1,
};
const isValidProp = (prop) => prop === 'count';
const $root = document.querySelector('#root');
const errorMessageIterator = ERROR_MESSAGE.LIST[Symbol.iterator]();

const updateDOM = (state) => {
  const counterTemplate = getCounterTemplate(state);
  const virtualDOM = parse(counterTemplate);

  render(virtualDOM, $root);
};

const stateSetter = (target, prop, value) => {
  try {
    if (!isValidProp(prop)) {
      throw new Error(`Failed to execute getter: ${prop} is invalid prop`);
    }
    if (value > DATE_OF_GRADUATION_CEREMONY) {
      const errorMessage = errorMessageIterator.next();

      if (errorMessage.done) {
        throw new Error(ERROR_MESSAGE.STOP);
      }
      throw new Error(errorMessage.value);
    }
    target[prop] = value;
    updateDOM(target);
  } catch (e) {
    console.error(e.message);
  } finally {
    return true;
  }
};

const stateGetter = (target, prop) => {
  try {
    if (!isValidProp(prop)) {
      throw new Error(`Failed to execute getter: ${prop} is invalid prop`);
    }
    return target[prop];
  } catch (e) {
    console.error(e.message);
  }
};

const stateHandler = {
  set: stateSetter,
  get: stateGetter,
};

const handleClickCounter = (e) => {
  const isAddButtonClicked = !!e.target.closest('.btn-add');
  const isSubtractButtonClicked = !!e.target.closest('.btn-subtract');
  const isResetButtonClicked = !!e.target.closest('.btn-reset');

  if (isAddButtonClicked) {
    state.count += COUNT_VALUE.DIFF;
    return;
  }
  if (isSubtractButtonClicked) {
    state.count -= COUNT_VALUE.DIFF;
    return;
  }
  if (isResetButtonClicked) {
    state.count = COUNT_VALUE.RESET;
  }
};

state = new Proxy(state, stateHandler);
updateDOM(state);
$root.addEventListener('click', handleClickCounter);
