import { render } from './renderer.js';
import { parse } from './parser.js';
import { counterTemplate } from './template.js';

let count = 0;

const $root = document.querySelector('#root');

const getVirtualDOM = () => {
  const template = counterTemplate(count);

  return parse(template);
};

const updateDOM = () => {
  const virtualDOM = getVirtualDOM();

  render(virtualDOM, $root);
};

const handleClickCounter = (e) => {
  const isAddButtonClicked = !!e.target.closest('.btn-add');
  const isSubtractButtonClicked = !!e.target.closest('.btn-subtract');
  const isResetButtonClicked = !!e.target.closest('.btn-reset');

  if (isAddButtonClicked) {
    count += 1;
    updateDOM();
    return;
  }
  if (isSubtractButtonClicked) {
    count -= 1;
    updateDOM();
    return;
  }
  if (isResetButtonClicked) {
    count = 0;
    updateDOM();
  }
};

updateDOM();
$root.addEventListener('click', handleClickCounter);
