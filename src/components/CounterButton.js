import { myReact } from '../lib/index.js';

const { createElement } = myReact;

const CounterButton = ({
  text,
  onClick = () => {
    console.log(`[${text}] clicked`);
  },
}) => createElement('button', { onClick }, createElement('strong', null, text));

export default CounterButton;
