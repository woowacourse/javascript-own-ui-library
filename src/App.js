const App = () => {
  return {
    type: 'div',
    props: {
      className: 'container',
      children: [
        {
          type: 'span',
          props: {
            className: 'count',
            children: '0',
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
