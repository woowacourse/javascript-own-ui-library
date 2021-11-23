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
    createElement('span', { class: 'count' }, createElement('text', {}, count)),
    createElement(
      'div',
      { class: 'btn-group' },
      createElement(
        'button',
        { click: decrease },
        createElement('strong', {}, createElement('text', {}, '-'))
      ),
      createElement(
        'button',
        { click: reset },
        createElement('strong', {}, createElement('text', {}, 'RESET'))
      ),
      createElement(
        'button',
        { click: increase },
        createElement('strong', {}, createElement('text', {}, '+'))
      )
    )
  );
};
