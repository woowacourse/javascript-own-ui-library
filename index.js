import { render } from './renderer.js';
import { parse } from './parser.js';
import { counterTemplate } from './template.js';

let count = 0;
const UPDATE_TIME_INTERVAL = 150;
const getVirtualDOM = () => parse(counterTemplate(count));
const $root = document.querySelector('#root');
const handleClickCounter = (e) => {
  const isSubtractButtonClicked = !!e.target.closest('.btn-subtract');
  const isAddButtonClicked = !!e.target.closest('.btn-add');
  const isResetButtonClicked = !!e.target.closest('.btn-reset');

  if (isSubtractButtonClicked) {
    count += 1;
    return;
  }
  if (isAddButtonClicked) {
    count -= 1;
    return;
  }
  if (isResetButtonClicked) {
    count = 0;
  }
};

const virtualDOM = getVirtualDOM();
$root.addEventListener('click', handleClickCounter);
render(virtualDOM, $root);

setInterval(() => {
  const virtualDOM = getVirtualDOM();

  render(virtualDOM, $root);
}, UPDATE_TIME_INTERVAL);
