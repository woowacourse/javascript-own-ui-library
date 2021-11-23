import render from './render.js';

let state;

const useState = (component, initialState) => {
  if (!component) {
    throw new Error('useState를 사용할 컴포넌트를 입력해주세요.');
  }

  const Component = component;

  if (state === undefined) {
    state = initialState;
  }

  const setState = (nextState) => {
    if (state === nextState) return;

    state = nextState;
    render(Component());
  };

  return [state, setState];
};

export default useState;
