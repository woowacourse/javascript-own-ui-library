import { render } from './renderer.js';
import { parse } from './parser.js';
import { getCounterTemplate } from './template.js';

const $root = document.querySelector('#root');

const updateDOM = (state) => {
  const counterTemplate = getCounterTemplate(state);
  const virtualDOM = parse(counterTemplate);

  render(virtualDOM, $root);
};

let state = { count: 0 };

state = new Proxy(state, {
  set(target, prop, value) {
    target[prop] = value;
    updateDOM(target);
    return true;
  },
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
  },
});

const handleClickCounter = (e) => {
  const isAddButtonClicked = !!e.target.closest('.btn-add');
  const isSubtractButtonClicked = !!e.target.closest('.btn-subtract');
  const isResetButtonClicked = !!e.target.closest('.btn-reset');

  if (isAddButtonClicked) {
    state.count += 1;
    return;
  }
  if (isSubtractButtonClicked) {
    state.count -= 1;
    return;
  }
  if (isResetButtonClicked) {
    state.count = 0;
  }
};

updateDOM(state);
$root.addEventListener('click', handleClickCounter);
