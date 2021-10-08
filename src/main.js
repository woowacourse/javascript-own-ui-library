import React from './react/react.js';
import ReactDOM from './react/reactDOM.js';

const element = React.createElement(
  'div',
  {
    className: 'container',
  },
  React.createElement(
    'span',
    {
      className: 'count',
    },
    '0'
  ),
  React.createElement(
    'div',
    {
      className: 'btn-group',
    },
    React.createElement(
      'button',
      null,
      React.createElement('strong', null, '-')
    ),
    React.createElement(
      'button',
      null,
      React.createElement('strong', null, 'RESET')
    ),
    React.createElement(
      'button',
      null,
      React.createElement('strong', null, '+')
    )
  )
);

ReactDOM.render(element, document.getElementById('root'));
