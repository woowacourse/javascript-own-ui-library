import Counter from './components/Counter.js';
import { myReact, myReactDOM } from './lib/index.js';
import { reducer, initialState } from './reducer.js';

const render = () => {
  myReactDOM.render(myReact.createElement(Counter, null), document.querySelector('#root'));
};

export const myReactHook = myReact.createHook(render);

render(); // 최초 렌더링
