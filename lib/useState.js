import App from '../App.js';
import { reRender } from './PeactDOM.js';

class State {
  #stateIndex;
  #stateTable;

  constructor() {
    this.#stateIndex = 0;
    this.#stateTable = new Map();
  }

  #resetIndex = () => {
    this.#stateIndex = 0;
  };

  useState = (value) => {
    // state를 setState에서 변경 가능한 상태로 가둬놓기 위해 객체로 선언
    const stateObj = {
      state: this.#stateTable.get(this.#stateIndex)
        ? this.#stateTable.get(this.#stateIndex).state
        : value,
      setState: (newValue) => {
        stateObj.state = newValue;
        this.#resetIndex();
        reRender(App());
      },
    };

    this.#stateTable.set(this.#stateIndex, stateObj);
    this.#stateIndex += 1;

    return [stateObj.state, stateObj.setState];
  };
}

const state = new State();

export default state.useState;
