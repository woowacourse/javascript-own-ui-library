import { Component } from "../lib/@types/types";
import useState from "../lib/hooks/useState";
import store from "../lib/store";
import Counter from "./Counter";

const Root: Component = () => {
  const [count, setCount] = useState(0);

  // count 가 똑같은 값이 계속 들어온다\

  const onIncrease = () => {
    const vStorage = store.getCurrentVStorage();
    setCount(count + 1);
  };

  const onDecrease = () => {
    const vStorage = store.getCurrentVStorage();
    setCount(count - 1);
  };

  const onReset = () => {
    const vStorage = store.getCurrentVStorage();
    setCount(0);
  };

  return `
    div.container
      (1)span.count
        (2)text: ${count}
      (1)${Counter({
        onIncrease,
        onDecrease,
        onReset,
      })}
  `;

  // return `
  //   div#id1.class1.class2$background-color: red$width: 100px$height: 100px
  //     (1)div#id2$background-color: blue$width: 50px$height: 50px
  //       (2)div#id2$background-color: tomato$width: 20px$height: 20px
  //       (2)div#id2$background-color: tomato$width: 20px$height: 20px
  //         (3)text: ${testText}
  //       (2)span
  //         (3)text: ${testText2}
  //     (1)div#id3$background-color: green$width: 50px$height: 50px
  // `;
};

export default Root;
