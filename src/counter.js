import { createElement } from './dom.js';

export const createCounterElement = (state, setState) => {
  const onMinusClick = () => {
    setState((prevState) => prevState - 1);
  };

  const onResetClick = () => {
    setState(0);
  };

  const onPlusClick = () => {
    setState((prevState) => prevState + 1);
  };

  return createElement(
    'div',
    [{ class: 'container' }],
    [
      createElement('span', [{ class: 'count' }], state),
      createElement(
        'div',
        [{ class: 'btn-group' }],
        [
          createElement('button', [{ click: onMinusClick }], [createElement('strong', [], '-')]),
          createElement(
            'button',
            [{ click: onResetClick }],
            [createElement('strong', [], 'RESET')]
          ),
          createElement('button', [{ click: onPlusClick }], [createElement('strong', [], '+')]),
        ]
      ),
    ]
  );
};
