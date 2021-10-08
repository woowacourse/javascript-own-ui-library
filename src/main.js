import React from './react/react.js';
import ReactDOM from './react/reactDOM.js';

let state = {
  count: 0,
};

const setState = newState => {
  state = { ...state, ...newState };
  ReactDOM.update();
};

const vDom = () =>
  React.createElement(
    'div',
    {
      className: 'container',
    },
    React.createElement(
      'span',
      {
        className: 'count',
      },
      state.count
    ),
    React.createElement(
      'div',
      {
        className: 'btn-group',
      },
      React.createElement(
        'button',
        {
          onclick: () => setState({ count: state.count - 1 }),
        },
        React.createElement('strong', null, '-')
      ),
      React.createElement(
        'button',
        {
          onclick: () => setState({ count: 0 }),
        },
        React.createElement('strong', null, 'RESET')
      ),
      React.createElement(
        'button',
        {
          onclick: () => setState({ count: state.count + 1 }),
        },
        React.createElement('strong', null, '+')
      )
    )
  );

ReactDOM.render(vDom, document.getElementById('root'));
