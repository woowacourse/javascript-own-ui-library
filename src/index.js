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

store.subscribe(render); // 이후 state의 변화가 생기면(reducer가 호출되면) 자동으로 render 시키기

render(); // 최초 렌더링
