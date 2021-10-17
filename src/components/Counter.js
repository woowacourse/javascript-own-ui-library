import { myReact } from '../lib/index.js';
import CounterButton from './CounterButton.js';

const { createElement } = myReact;

const Counter = () => {
  return createElement(
    'div',
    {
      className: 'container',
    },
    createElement('span', { className: 'count' }, 0),
    createElement(
      'div',
      { className: 'btn-group' },
      createElement(CounterButton, { text: '-' }),
      createElement(CounterButton, { text: 'reset' }),
      createElement(CounterButton, { text: '+' })
    )
  );
};

export default Counter;
