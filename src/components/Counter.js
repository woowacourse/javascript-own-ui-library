import Zig from '../lib/zig-react';

const Counter = () => {
  const [initialCount, setCount] = Zig.useState(0);

  const count = new Proxy(initialCount, {
    get(target, prop) {
      try {
        let value = target[prop];

        return typeof target.value === 'function' ? value.call(target) : target.value;
      } catch (error) {
        console.error(`Proxy get Error: ${error}`);
      }
    },
  });

  const decrease = () => {
    setCount(count.value - 1);
  };

  const increase = () => {
    setCount(count.value + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return () =>
    Zig.createElement(
      'div',
      { className: 'container' },
      Zig.createElement('span', { className: 'count' }, count.value),
      Zig.createElement(
        'div',
        { className: 'btn-group' },
        Zig.createElement('button', { id: 'decrement', onclick: decrease }, Zig.createElement('strong', {}, '-')),
        Zig.createElement('button', { id: 'reset', onclick: reset }, Zig.createElement('strong', {}, 'RESET')),
        Zig.createElement('button', { id: 'increment', onclick: increase }, Zig.createElement('strong', {}, '+'))
      ),
      '이러다 다 죽어~! 🔫'
    );
};

export default Counter;
