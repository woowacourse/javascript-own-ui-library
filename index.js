import { $ } from './src/utils.js';
import { createCounterDOM } from './src/renderer.js';
import { createCounterDocumentObject } from './src/counter.js';

const state = { value: 0 };
export const render = () => {
  $('#root').innerHTML = '';
  const counter = createCounterDocumentObject(state);
  const virtualDocument = createCounterDOM(counter);

  $('#root').appendChild(virtualDocument);
};

render();
