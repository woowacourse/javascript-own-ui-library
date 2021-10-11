import React from '../lib/react';

const Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="container">
      <span className="count">{count}</span>
      <div className="btn-group">
        <button id="decrement" onClick={() => setCount(count - 1)}>
          <strong>-</strong>
        </button>
        <button id="reset">
          <strong>RESET</strong>
        </button>
        <button id="increment" onClick={() => setCount(count + 1)}>
          <strong>+</strong>
        </button>
      </div>
      이러다 다 죽어~! 🔫
    </div>
  );
};

export default Counter;
