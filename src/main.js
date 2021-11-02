import React from './react/react.js';
import ReactDOM from './react/reactDOM.js';

const App = () => {
  const [count, setCount] = React.useState(0);
  const [another, setAnother] = React.useState(true);

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
      `${count}${another}`
    ),
    React.createElement(
      'div',
      {
        className: 'btn-group',
      },
      React.createElement(
        'button',
        {
          onclick: () => {
            setCount(count - 1);
            setAnother(!another);
          },
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

ReactDOM.render(App, document.getElementById('root'));
