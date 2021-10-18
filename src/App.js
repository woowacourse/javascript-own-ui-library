import Sunny from './Sunny/index.js';
import SunnyDom from './SunnyDom/index.js';

const DEFAULT_COUNT = 0;

let count = 0;

const App = () => {
  const onDecrement = () => {
    count = count - 1;
    SunnyDom.render(App());
  };

  const onIncrement = () => {
    count = count + 1;
    SunnyDom.render(App());
  };

  const onReset = () => {
    count = DEFAULT_COUNT;
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
