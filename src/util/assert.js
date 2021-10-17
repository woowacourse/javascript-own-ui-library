import { throwError } from "./error.js";

const assert = (func, expected, compare = (a, b) => a === b) => {
  const result = func();

  if (!compare(result, expected)) {
    throwError(`expected ${expected}, but actual is ${result}`);
  }
};

const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default {
  equal: (func, expected) => assert(func, expected),
  deepEqual: (func, expected) => assert(func, expected, deepCompare),
};
