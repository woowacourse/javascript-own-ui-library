import Zig from '../lib/zig-react';

const Counter = () => {
  const [getCount, setCount] = Zig.useState(0);

  const decrease = () => {
    setCount(getCount() - 1);
  };

  const increase = () => {
    setCount(getCount() + 1);
  };

  const reset = () => setCount(0);

  return Zig.createElement(
    'div',
    { className: 'container' },
    Zig.createElement('span', { className: 'count' }, getCount()),
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
