import { isKeyOf } from "./util/typeGuard";

interface State<T> {
  value: T;
}

const Core = (function () {
  let states: State<unknown>[] = [];
  let stateIndex = 0;

  const useState = <T>(initialValue: T): State<T> => {
    const currentStateIndex = stateIndex;
    stateIndex++;

    if (states[currentStateIndex] === undefined) {
      states[currentStateIndex] = {
        value: initialValue,
      };
    }

    return new Proxy(states[currentStateIndex] as State<T>, {
      get(obj, prop) {
        if (isKeyOf(obj, prop)) {
          return { ...states[currentStateIndex] }[prop];
        }
      },
      set(obj, prop, value) {
        if (isKeyOf(obj, prop)) {
          states = [...states];
          states[currentStateIndex][prop] = value;

          return true;
        }

        return false;
      },
    });
  };

  return {
    states,
    useState,
    initStateIndex: () => {
      stateIndex = 0;
    },
  };
})();

export default Core;
