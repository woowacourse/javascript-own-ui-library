export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

/* button events */

/**
 * @param {Object} state
 * @param {String} state.value
 */
export const minus = (state) => {
  state.value -= 1;
  console.log(state.value);
};

/**
 * @param {Object} state
 * @param {String} state.value
 */
export const plus = (state) => {
  state.value += 1;
  console.log(state.value);
};

/**
 * @param {Object} state
 * @param {String} state.value
 */
export const reset = (state) => {
  state.value = 0;
  console.log(state.value);
};
