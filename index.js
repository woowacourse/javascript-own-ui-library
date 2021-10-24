import { render } from './renderer.js';
import { parse } from './parser.js';
import { getCounterTemplate } from './template.js';

const $root = document.querySelector('#root');

const updateDOM = (state) => {
  const counterTemplate = getCounterTemplate(state);
  const virtualDOM = parse(counterTemplate);

  render(virtualDOM, $root);
};

const DATE_OF_GRADUATION_CEREMONY = 1126;
const lyrics = [
  '안녕은 영원한 헤어짐은 아니겠지요.',
  '다시 만나기 위한 약속일거야',
  '함께했던 시간은 이젠 추억으로 남기고',
  '서로 가야할 길 찾아서 떠나야해요',
];
const lyricsIter = lyrics[Symbol.iterator]();

let state = { count: DATE_OF_GRADUATION_CEREMONY - 1 };
const propList = ['count'];

const stateSetter = (target, prop, value) => {
  try {
    if (!propList.includes(prop)) {
      throw new Error('Invalid prop');
    }
    if (prop === 'count' && value > DATE_OF_GRADUATION_CEREMONY) {
      throw new Error(lyricsIter.next().value);
    }
    target[prop] = value;
    updateDOM(target);
  } catch (e) {
    console.log(e);
  } finally {
    return true;
  }
};

const stateGetter = (target, prop) => {
  if (prop in target) {
    return target[prop];
  }
};

const stateHandler = {
  set: stateSetter,
  get: stateGetter,
};

state = new Proxy(state, stateHandler);

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
