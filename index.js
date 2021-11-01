import { $ } from './src/utils.js';
import { createCounterDOM } from './src/renderer.js';
import { createCounterElement } from './src/counter.js';

const state = { value: 0 };
export const render = () => {
  $('#root').innerHTML = '';
  const counter = createCounterElement(state);
  const virtualDocument = createCounterDOM(counter);

  $('#root').appendChild(virtualDocument);
};

render();
