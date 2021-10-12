import React, { useState } from './react/react.js';
import ReactDOM from './react/reactDOM.js';

const vDom = () => {
  const [count, setCount] = useState(0);

  return React.createElement(
    'div',
    {
      className: 'container',
    },
    React.createElement(
      'span',
      {
        className: 'count',
      },
      count
    ),
    React.createElement(
      'div',
      {
        className: 'btn-group',
      },
      React.createElement(
        'button',
        {
          onclick: () => setCount(count - 1),
        },
        React.createElement('strong', null, '-')
      ),
      React.createElement(
        'button',
        {
          onclick: () => setCount(0),
        },
        React.createElement('strong', null, 'RESET')
      ),
      React.createElement(
        'button',
        {
          onclick: () => setCount(count + 1),
        },
        React.createElement('strong', null, '+')
      )
    )
  );
};

ReactDOM.render(vDom, document.getElementById('root'));
