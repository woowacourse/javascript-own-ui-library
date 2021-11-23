import { isKeyOf } from "./util/typeGuard";

interface State<T> {
  value: T;
}

interface ReturnValue {
  states: State<unknown>[];
  useState: <T>(initialValue: T) => State<T>;
  initStateIndex: () => void;
}

const Core = (function () {
  const returnValue: ReturnValue = {
    states: [],
    useState,
    initStateIndex: () => {
      stateIndex = 0;
    },
  };
  let stateIndex = 0;

  function useState<T>(initialValue: T): State<T> {
    const currentStateIndex = stateIndex;
    stateIndex++;

    if (returnValue.states[currentStateIndex] === undefined) {
      returnValue.states[currentStateIndex] = {
        value: initialValue,
      };
    }

    return new Proxy(returnValue.states[currentStateIndex] as State<T>, {
      get(obj, prop) {
        if (isKeyOf(obj, prop)) {
          return { ...returnValue.states[currentStateIndex] }[prop];
        }
      },
      set(obj, prop, value) {
        if (isKeyOf(obj, prop)) {
          returnValue.states = [...returnValue.states];
          returnValue.states[currentStateIndex][prop] = value;

          return true;
        }

        return false;
      },
    });
  }

  return returnValue;
})();

export default Core;
