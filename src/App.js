import Sunny from './Sunny/index.js';
import SunnyDom from './SunnyDom/index.js';

const DEFAULT_COUNT = 0;

const initialState = {
  count: 0,
};

const App = () => {
  const state = SunnyDom.stateManager(initialState, () => SunnyDom.render(App()));

  const onDecrement = () => {
    state.count = state.count - 1;
  };

  const onIncrement = () => {
    state.count = state.count + 1;
  };

  const onReset = () => {
    state.count = DEFAULT_COUNT;
  };

  return Sunny.createElement('div', {
    class: 'container',
    children: [
      Sunny.createElement('span', { class: 'count', textContent: state.count }),
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
