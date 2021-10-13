import store from "../store";

const useState = <T>(defaultValue: T): [T, (state: T) => void] => {
  const vStorage = store.getCurrentVStorage();
  vStorage.increaseStateIndex();
  const stateIndex = vStorage.getStateIndex();

  if (!vStorage.getState(stateIndex)) {
    vStorage.setState(stateIndex, defaultValue);
  }

  const state = vStorage.getState(stateIndex);

  const setState = (newState: T) => {
    if (state === newState) {
      return;
    }

    vStorage.setState(stateIndex, newState);
    const renderer = store.getCurrentRenderer();
    renderer();
  };

  return [state, setState];
};

export default useState;
