import Counter from './Counter.js';
import { render } from './lib/PeactDOM.js';

const rootElement = document.getElementById('root');

render(Counter(), rootElement);
