class State {
  #key;
  constructor() {
    this.#key = 0;
    this.store = new Map();
  }

  addState(value) {
    this.store.set(this.#key, value);
    return this.#key++;
  }
}

const state = new State();

function useState(init) {
  const stateKey = state.addState(init);

  const setState = (next) => {
    state.store.set(stateKey, next);
  };

  return [state.store.get(stateKey), setState];
}

export default useState;
