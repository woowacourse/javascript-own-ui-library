import { myReact } from '../lib/index.js';
import CounterButton from './CounterButton.js';

const { createElement } = myReact;

const Counter = ({ getState, dispatch }) => {
  const { number } = getState();

  const onDecrease = () => {
    dispatch({ type: 'DECREASE' });
  };

  const onIncrease = () => {
    dispatch({ type: 'INCREASE' });
  };

  const onReset = () => {
    dispatch({ type: 'RESET' });
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
      createElement(CounterButton, { text: '-', onClick: onDecrease }),
      createElement(CounterButton, { text: 'reset', onClick: onReset }),
      createElement(CounterButton, { text: '+', onClick: onIncrease })
    )
  );
};

export default Counter;
