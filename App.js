import { createElement, render } from './library/JuactDOM.js';

export const App = () => {
  let count = 0;

  const increase = () => {
    count += 1;
    render(elements(), document.getElementById('root'));
  };

  const decrease = () => {
    count -= 1;
    render(elements(), document.getElementById('root'));
  };

  const reset = () => {
    count = 0;
    render(elements(), document.getElementById('root'));
  };

  const elements = () =>
    createElement(
      'div',
      { class: 'container' },
      createElement(
        'span',
        { class: 'count' },
        createElement('text', {}, count)
      ),
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

  return elements();
};
