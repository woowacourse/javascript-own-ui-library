import ReactDOM from "./ReactDOM.js";
import { throwError } from "../util/error.js";

/**
 * @param initialState 최초 상태. 반드시 객체여야 한다.
 * @returns [getter, setter] 최신 상태를 반환하는 getter와 상태를 갱신하는 setter를 반환한다
 */
const createStateMachine = (initialState = {}) => {
  if (typeof initialState !== "object" || initialState == null) {
    throwError(`initialState는 반드시 객체여야 합니다: ${initialState}`);
  }

  let state = initialState;

  const setState = (key, value) => {
    state = {
      ...state,
      [key]: typeof value === "function" ? value(state[key]) : value,
    };

    // FIXME
    ReactDOM.render();
  };

  const getState = () => state;

  return [getState, setState];
};

export default createStateMachine;
