import myDOM from "./render";

interface Hook {
  values: any[];
  index: number;
  useState: <T>(initialValue: T) => [T, (value: T) => void];
}

const hook: Hook = {
  values: [],
  index: 0,
  useState<T>(initialValue: T) {
    const stateIndex = this.index++;
    const isFirstRendered = this.values.length <= stateIndex;
    const state = isFirstRendered ? initialValue : this.values[stateIndex];

    const setState = (value: T) => {
      this.values[stateIndex] = value;
      this.index = 0;

      myDOM._render();
    };

    return [state, setState];
  },
};

export default hook;
