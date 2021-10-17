import { createElement } from './lib/Peact.js';
import useState from './lib/useState.js';

function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return createElement(
    'div',
    { class: 'container' },
    createElement('span', { class: 'count' }, createElement('text', {}, count)),
    createElement(
      'div',
      { class: 'btn-group' },
      createElement(
        'button',
        { click: decrease },
        createElement('strong', {}, createElement('text', {}, '-'))
      ),
      createElement(
        'button',
        { click: reset },
        createElement('strong', {}, createElement('text', {}, 'RESET'))
      ),
      createElement(
        'button',
        { click: increase },
        createElement('strong', {}, createElement('text', {}, '+'))
      )
    )
  );
}

export default Counter;
