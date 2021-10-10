import Sunny from './Sunny.js';

const App = () => {
  const onDecrement = () => {
    console.log('decrement');
  };

  const onIncrement = () => {
    console.log('increment');
  };

  const onReset = () => {
    console.log('reset');
  };

  return Sunny.createElement('div', {
    class: 'container',
    children: [
      Sunny.createElement('span', { class: 'count', textContent: '0' }),
      Sunny.createElement('div', {
        class: 'btn-group',
        children: [
          Sunny.createElement('button', {
            children: [Sunny.createElement('strong', { textContent: '-' })],
            eventListener: { click: onDecrement },
          }),
          Sunny.createElement('button', {
            children: [Sunny.createElement('strong', { textContent: 'RESET' })],
            eventListener: { click: onReset },
          }),
          Sunny.createElement('button', {
            children: [Sunny.createElement('strong', { textContent: '+' })],
            eventListener: { click: onIncrement },
          }),
        ],
      }),
    ],
  });
};

export default App;
