import Sunny from './Sunny.js';
import SunnyDom from './SunnyDom.js';

const DEFAULT_COUNT = 0;

let count = 0;

const App = () => {
  const onDecrement = () => {
    console.log('decrement');
    count = count - 1;
    SunnyDom.render(App());
  };

  const onIncrement = () => {
    console.log('increment');
    console.log('실행! : ', count);

    count = count + 1;
    SunnyDom.render(App());
  };

  const onReset = () => {
    console.log('reset');

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
