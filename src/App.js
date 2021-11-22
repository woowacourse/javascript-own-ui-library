import Sun from '../Sun/index.js';

const INITIAL_COUNT = 0;
let count = INITIAL_COUNT;

const App = () => {
  const onIncrease = () => {
    count += 1;

    Sun.render(App());
  };

  const onDecrease = () => {
    count -= 1;

    Sun.render(App());
  };

  const onReset = () => {
    count = INITIAL_COUNT;

    Sun.render(App());
  };

  return {
    type: 'div',
    props: {
      className: 'container',
      children: [
        {
          type: 'span',
          props: {
            className: 'count',
            children: count,
          },
        },
        {
          type: 'div',
          props: {
            className: 'btn-group',
            children: [
              {
                type: 'button',
                props: {
                  events: {
                    click: onDecrease,
                  },
                  children: {
                    type: 'strong',
                    props: {
                      children: '-',
                    },
                  },
                },
              },
              {
                type: 'button',
                props: {
                  events: {
                    click: onReset,
                  },
                  children: {
                    type: 'strong',
                    props: {
                      children: 'RESET',
                    },
                  },
                },
              },
              {
                type: 'button',
                props: {
                  events: {
                    click: onIncrease,
                  },
                  children: {
                    type: 'strong',
                    props: {
                      children: '+',
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
};

export default App;
