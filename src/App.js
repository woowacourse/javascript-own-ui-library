import Sunny from './Sunny.js';
import SunnyDom from './SunnyDom.js';

const DEFAULT_COUNT = 0;

let count = 0;

let buttonText = 'RESET';

const App = () => {
  const onDecrement = () => {
    count = count - 1;
    SunnyDom.render(App());
  };

  const onIncrement = () => {
    count = count + 1;
    buttonText = 'RESET';
    SunnyDom.render(App());
  };

  const onReset = () => {
    count = DEFAULT_COUNT;
    buttonText = 'UNSET';
    SunnyDom.render(App());
  };

  return Sunny.createElement('div', {
    class: 'container',
    children: [
      Sunny.createElement('span', { class: 'count', textContent: count }),
      Sunny.createElement('div', {
        class: 'btn-group',
        children: [
          Sunny.createElement('button', {
            children: [Sunny.createElement('strong', { textContent: '-' })],
            eventListener: { click: onDecrement },
          }),
          Sunny.createElement('button', {
            children: [Sunny.createElement('strong', { textContent: buttonText })],
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
