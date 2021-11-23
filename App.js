import { createElement } from './library/JuactDOM.js';

export const App = () => {
  let count = 0;

  const increase = () => {
    count += 1;
  };

  const decrease = () => {
    count -= 1;
  };

  const reset = () => {
    count = 0;
  };

  return createElement(
    'div',
    { class: 'container' },
    createElement(
      'span',
      { class: 'count' },
      createElement('text', null, count)
    ),
    createElement(
      'div',
      { class: 'btn-group' },
      createElement(
        'button',
        { click: decrease },
        createElement('strong', null, createElement('text', null, '-'))
      ),
      createElement(
        'button',
        { click: reset },
        createElement('strong', null, createElement('text', null, 'RESET'))
      ),
      createElement(
        'button',
        { click: increase },
        createElement('strong', null, createElement('text', null, '+'))
      )
    )
  );
};
