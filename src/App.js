import Sun from '../Sun/index.js';

const INITIAL_COUNT = 0;

const App = () => {
  const [count, setCount] = Sun.useState(App, INITIAL_COUNT);

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onDecrease = () => {
    setCount(count - 1);
  };

  const onReset = () => {
    setCount(INITIAL_COUNT);
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
