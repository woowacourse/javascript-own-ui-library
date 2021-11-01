import { myReact } from '../lib/index.js';
import CounterButton from './CounterButton.js';
import { myReactHook } from '../index.js';

const { createElement } = myReact;

const Counter = () => {
  const [number, setNumber] = myReactHook.useState(0);

  const onIncrease = () => {
    setNumber((state) => state + 1);
  };

  const onDecrease = () => {
    setNumber((state) => state - 1);
  };

  const onReset = () => {
    setNumber(() => 0);
  };

  return createElement(
    'div',
    {
      className: 'container',
    },
    createElement('span', { className: 'count' }, number),
    createElement(
      'div',
      { className: 'btn-group' },
      createElement(CounterButton, {
        text: '-',
        onClick: onDecrease,
      }),
      createElement(CounterButton, {
        text: 'reset',
        onClick: onReset,
      }),
      createElement(CounterButton, {
        text: '+',
        onClick: onIncrease,
      })
    )
  );
};

export default Counter;
