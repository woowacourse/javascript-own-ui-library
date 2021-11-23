import { createElement } from './library/JuactDOM.js';
import { useState } from './library/useState.js';

export const App = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
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
