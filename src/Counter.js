import { createElement, html, useState } from '../lib/React.js';

const INIT_NUMBER = 0;
const initState = { number: '0' };

const Counter = () => {
  const state = useState(initState);

  const increase = () => {
    state.number = Number(state.number) + 1;
  };

  const decrease = () => {
    state.number = Number(state.number) - 1;
  };

  const reset = () => {
    state.number = INIT_NUMBER;
  };

  return createElement(
    html('div', { className: 'container' }, [
      html('span', { className: 'count' }, [state.number]),
      html('div', { className: 'btn-group' }, [
        html('button', null, [html('strong', { onClick: decrease }, ['-'])]),
        html('button', null, [html('strong', { onClick: reset }, ['RESET'])]),
        html('button', null, [html('strong', { onClick: increase }, ['+'])]),
      ]),
    ])
  );
};

export default Counter;
