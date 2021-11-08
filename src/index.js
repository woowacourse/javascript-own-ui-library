import Counter from './components/Counter.js';
import { myReact, myReactDOM } from './lib/index.js';
import { reducer, initialState } from './reducer.js';

import { logger, thunk } from './lib/middleware.js';
import createStore from './lib/store.js';

const store = createStore(reducer, initialState, logger, thunk);

const render = () => {
  myReactDOM.render(
    myReact.createElement(Counter, { getState: store.getState, dispatch: store.dispatch }),
    document.querySelector('#root')
  );
};

store.subscribe(render);

render(); // 최초 렌더링
