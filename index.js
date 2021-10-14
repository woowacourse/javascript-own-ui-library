import Cheffe from './cheffe.js';
import CheffeDOM from './cheffeDOM.js';

const App = () => {
  let count = 0;

  const onDecrease = () => {
    console.log('-');
    count += 1;
  };

  const onIncrease = () => {
    console.log('+');
    count -= 1;
  };

  const onReset = () => {
    console.log('reset');
    count = 0;
  };

  return Cheffe.createElement('div', { class: 'container' }, [
    Cheffe.createElement('span', { class: 'count' }, count),
    Cheffe.createElement('div', { class: 'btn-group' }, [
      Cheffe.createElement(
        'button',
        {
          onclick: onDecrease,
        },
        [Cheffe.createElement('strong', null, '-')]
      ),
      Cheffe.createElement(
        'button',
        {
          onclick: onReset,
        },
        [Cheffe.createElement('strong', null, 'RESET')]
      ),
      Cheffe.createElement(
        'button',
        {
          onclick: onIncrease,
        },
        [Cheffe.createElement('strong', null, '+')]
      ),
    ]),
  ]);
};

const cheffeDOM = new CheffeDOM();
const rootElement = document.getElementById('root');
cheffeDOM.render(App, rootElement);
