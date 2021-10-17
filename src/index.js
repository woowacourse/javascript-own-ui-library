import Counter from './components/Counter.js';
import { myReact, myReactDOM } from './lib/index.js';

myReactDOM.render(myReact.createElement(Counter), document.querySelector('#root'));
