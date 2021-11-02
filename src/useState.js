import { render } from '../index.js';

const state = { prevState: null, currentState: null };

/**
 * @param {any} initialValue
 */
export const useState = (initialValue) => {
  state.currentState = initialValue;

  /**
   * @param {any} stateToChange
   */
  const setState = (stateToChange) => {
    if (typeof stateToChange === 'function') {
      state.prevState = state.currentState;
      state.currentState = stateToChange(state.prevState);
      render(state.currentState);
    } else {
      state.prevState = state.currentState;
      state.currentState = stateToChange;
      render(state.currentState);
    }
  };

  return [state.currentState, setState];
};
