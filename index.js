import Cheffe from './cheffe.js';
import CheffeDOM from './cheffeDOM.js';

const initialState = {
  count: 0,
};

const state = new Proxy(initialState, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
  },
  set(target, prop, value) {
    if (target[prop] === value) {
      return true;
    }

    target[prop] = value;
    CheffeDOM.update(App());

    return true;
  },
});

const onDecrease = () => {
  state.count -= 1;
};

const onIncrease = () => {
  state.count += 1;
};

const onReset = () => {
  state.count = 0;
};

const App = () =>
  Cheffe.createElement('div', { class: 'container' }, [
    Cheffe.createElement('span', { class: 'count' }, [state.count]),
    Cheffe.createElement('div', { class: 'btn-group' }, [
      Cheffe.createElement(
        'button',
        {
          onclick: onDecrease,
        },
        [Cheffe.createElement('strong', null, ['-'])]
      ),
      Cheffe.createElement(
        'button',
        {
          onclick: onReset,
        },
        [Cheffe.createElement('strong', null, ['RESET'])]
      ),
      Cheffe.createElement(
        'button',
        {
          onclick: onIncrease,
        },
        [Cheffe.createElement('strong', null, ['+'])]
      ),
    ]),
  ]);

const rootElement = document.getElementById('root');
CheffeDOM.render(App(), rootElement);
