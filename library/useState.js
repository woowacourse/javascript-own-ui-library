import { render } from './JuactDOM.js';
import { App } from '../App.js';

let state = undefined;

export const useState = (initState) => {
  if (state === undefined) {
    state = initState;
  }

  const setState = (newState) => {
    state = newState;

    render(App(), document.getElementById('root'));
  };

  return [state, setState];
};
