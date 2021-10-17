import ReactDOM from "./ReactDOM.js";
import assert from "../util/assert.js";

/**
 * @returns [getter, setter, initiator] 최신 상태를 반환하는 getter, 상태를 갱신하는 setter, 초기 상태를 저장하는 initiator
 */

const createStateMachine = () => {
  let state = {};
  let isFirstCall = false;

  const setState = (key, value) => {
    state = {
      ...state,
      [key]: typeof value === "function" ? value(state[key]) : value,
    };
    console.log(`[setState]`, state);

    // FIXME
    ReactDOM.render();
  };

  const getState = () => {
    console.log(`[getState]`, state);

    return { ...state };
  };

  const initState = (initialState) => {
    if (isFirstCall) return;

    isFirstCall = true;

    assert.equal(
      () => typeof initialState === "object" && initialState != null,
      true
    );

    state =
      typeof initialState === "function" ? initialState() : { ...initialState };
    console.log(`[initState]`, state);
  };

  return [getState, setState, initState];
};

export default createStateMachine;
