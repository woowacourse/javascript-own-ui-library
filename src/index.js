import Counter from './components/Counter.js';
import { myReact, myReactDOM } from './lib/index.js';
import createStore from './lib/store.js';

const initialState = {
  number: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        number: state.number + 1,
      };
    case 'DECREASE':
      return {
        number: state.number - 1,
      };
    case 'RESET':
      return {
        number: 0,
      };
    default:
      return state;
  }
};

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

store.subscribe(render);
render();
