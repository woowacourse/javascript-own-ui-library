import { $ } from './src/utils.js';
import { createCounterDOM } from './src/renderer.js';
import { createCounterElement } from './src/counter.js';
import { useState } from '../src/useState.js';

const [count, setCount] = useState(0);

export const render = (state) => {
  $('#root').innerHTML = '';

  const counter = createCounterElement(state ? state : count, setCount);
  const virtualDocument = createCounterDOM(counter);

  $('#root').appendChild(virtualDocument);
};

render();
