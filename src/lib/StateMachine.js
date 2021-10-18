import { rerender } from "./ReactDOM.js";
import { throwError } from "../util/error.js";

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

    rerender();
  };

  const getState = () => ({ ...state });

  const initState = (initialState) => {
    if (isFirstCall) return;

    isFirstCall = true;

    if (typeof initialState !== "object" || initialState === null) {
      throwError(
        `initialState는 객체이거나 객체를 반환하는 함수여이어야 합니다`
      );
    }

    state =
      typeof initialState === "function" ? initialState() : { ...initialState };
  };

  return [getState, setState, initState];
};

export default createStateMachine;
