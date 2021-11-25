import { myReact } from '../lib/index.js';
import { delay } from '../lib/utils.js';
import CounterButton from './CounterButton.js';

const { createElement } = myReact;

const randomAsyncIncreaseThunk = async (dispatch) => {
  await delay(1000);

  dispatch({ type: 'RANDOM', payload: Math.floor(Math.random() * 5 + 1) });
};

const Counter = ({ getState, dispatch }) => {
  const { number } = getState();

  const onIncrease = () => {
    dispatch({ type: 'INCREASE' });
  };

  const onDecrease = () => {
    dispatch({ type: 'DECREASE' });
  };

  const onReset = () => {
    dispatch({ type: 'RESET' });
  };

  const onRandom = () => {
    dispatch(randomAsyncIncreaseThunk);
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
      createElement(CounterButton, { text: 'random', onClick: onRandom }),
      createElement(CounterButton, { text: '+', onClick: onIncrease })
    )
  );
};

export default Counter;
