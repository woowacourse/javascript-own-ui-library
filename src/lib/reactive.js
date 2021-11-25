import { rerender } from "./ReactDOM.js";
import { throwError } from "../util/error.js";

const NON_EXISTENT_PROP =
  "initialState에 존재하지 않는 프로퍼티는 설정할 수 없습니다.";

const reactive = (() => {
  let index = 0;
  const states = new Map();

  const createProxy = (state) =>
    new Proxy(state, {
      set(target, key, value, receiver) {
        const settled = Reflect.has(target, key)
          ? Reflect.set(target, key, value, receiver)
          : throwError(NON_EXISTENT_PROP);

        rerender();
        index = 0;

        return settled;
      },
    });

  return (initialState) => {
    const reactiveState = states.has(index)
      ? states.get(index)
      : createProxy(initialState);

    states.set(index, reactiveState);
    index += 1;

    return reactiveState;
  };
})();

export default reactive;
