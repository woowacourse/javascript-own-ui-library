import { render } from './renderer.js';
import { parse } from './parser.js';
import { counterTemplate } from './template.js';

let count = 0;
const UPDATE_TIME_INTERVAL = 150;
const getVirtualDOM = () => parse(counterTemplate(count));
const $root = document.querySelector('#root');
const addEventListeners = () => {
  const $subtractButton = document.querySelector('.btn-subtract');
  const $addButton = document.querySelector('.btn-add');
  const $resetButton = document.querySelector('.btn-reset');

  $addButton.addEventListener('click', () => (count += 1));
  $subtractButton.addEventListener('click', () => (count -= 1));
  $resetButton.addEventListener('click', () => (count = 0));
};

const virtualDOM = getVirtualDOM();

render(virtualDOM, $root);
addEventListeners();

setInterval(() => {
  const virtualDOM = getVirtualDOM();

  render(virtualDOM, $root);
  addEventListeners();
}, UPDATE_TIME_INTERVAL);
