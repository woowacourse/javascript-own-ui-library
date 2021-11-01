import { minus, plus, reset } from '../src/utils.js';

import { createElement } from './dom.js';

export const createCounterElement = (state) => {
  return createElement(
    'div',
    [{ class: 'container' }],
    [
      createElement('span', [{ class: 'count' }], state.value),
      createElement(
        'div',
        [{ class: 'btn-group' }],
        [
          createElement(
            'button',
            [{ click: () => minus(state) }],
            [createElement('strong', [], '-')]
          ),
          createElement(
            'button',
            [{ click: () => reset(state) }],
            [createElement('strong', [], 'RESET')]
          ),
          createElement(
            'button',
            [{ click: () => plus(state) }],
            [createElement('strong', [], '+')]
          ),
        ]
      ),
    ]
  );
};
