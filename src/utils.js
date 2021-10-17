import { render } from '../index.js';

export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

/* button events */

/**
 * @param {Object} state
 * @param {String} state.value
 */
export const minus = (state) => {
  state.value -= 1;
  render();
};

/**
 * @param {Object} state
 * @param {String} state.value
 */
export const plus = (state) => {
  state.value += 1;
  render();
};

/**
 * @param {Object} state
 * @param {String} state.value
 */
export const reset = (state) => {
  state.value = 0;
  render();
};
