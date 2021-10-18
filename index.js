import Cheffe from './cheffe.js';
import CheffeDOM from './cheffeDOM.js';

let count = 0;

const App = () => {
  const onDecrease = () => {
    count -= 1;

    CheffeDOM.update(
      Cheffe.createElement('div', { class: 'container' }, [
        Cheffe.createElement('span', { class: 'count' }, [count]),
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
      ])
    );
  };

  const onIncrease = () => {
    count += 1;

    CheffeDOM.update(
      Cheffe.createElement('div', { class: 'container' }, [
        Cheffe.createElement('span', { class: 'count' }, [count]),
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
      ])
    );
  };

  const onReset = () => {
    count = 0;

    CheffeDOM.update(
      Cheffe.createElement('div', { class: 'container' }, [
        Cheffe.createElement('span', { class: 'count' }, [count]),
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
      ])
    );
  };

  return Cheffe.createElement('div', { class: 'container' }, [
    Cheffe.createElement('span', { class: 'count' }, [count]),
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
};

const rootElement = document.getElementById('root');
CheffeDOM.render(App, rootElement);
