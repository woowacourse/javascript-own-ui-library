import { createElement } from './lib/Peact.js';

function Counter() {
  return createElement(
    'div',
    { class: 'container' },
    createElement('span', { class: 'count' }, createElement('text', {}, '0')),
    createElement(
      'div',
      { class: 'btn-group' },
      createElement(
        'button',
        {},
        createElement('strong', {}, createElement('text', {}, '-'))
      ),
      createElement(
        'button',
        {},
        createElement('strong', {}, createElement('text', {}, 'RESET'))
      ),
      createElement(
        'button',
        {},
        createElement('strong', {}, createElement('text', {}, '+'))
      )
    )
  );
}

export default Counter;
