import Counter from './components/Counter.js';
import { myReact, myReactDOM } from './lib/index.js';
import createStore from './lib/store.js';
import { reducer, initialState } from './reducer.js';

const store = createStore(reducer, initialState);

const render = () => {
  myReactDOM.render(
    myReact.createElement(Counter, {
      getState: store.getState,
      dispatch: store.dispatch,
    }),
    document.querySelector('#root')
  );
};

export const myReactHook = myReact.createHook(render);

render(); // 최초 렌더링
