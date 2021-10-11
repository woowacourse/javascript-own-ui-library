import store from "../store";

const useState = <T>(defaultValue: T): [T, (state: T) => void] => {
  const vStorage = store.getCurrentVStorage();
  const currentElementIndex = vStorage.getCurrentElementIndex();
  const currentStateIndex = vStorage.getCurrentStateIndex();

  if (!vStorage.getElementState(currentElementIndex)) {
    vStorage.initState(currentElementIndex);
  }

  if (!vStorage.getState(currentElementIndex, currentStateIndex)) {
    vStorage.addState(currentElementIndex, currentStateIndex, defaultValue);
  }

  const state = vStorage.getState(currentElementIndex, currentStateIndex);
  const setState = (newState: T) => {
    if (state === newState) {
      return;
    }

    vStorage.setState(currentElementIndex, currentStateIndex, newState);
    const renderer = store.getCurrentRenderer();
    renderer();
  };

  vStorage.increaseStateIndex();

  return [state, setState];
};

export default useState;
