import createVDOM from "../lib/createVDOM.js";
import store from "../lib/store.js";

const CounterState = {
  count: 0,
};

const Counter = () => {
  const state = store(CounterState, Counter);

  const onDecreaseNumber = () => {
    state.count -= 1;
  };

  const onResetButton = () => {
    state.count = 0;
  };

  const onIncreaseNumber = () => {
    state.count += 1;
  };

  return createVDOM(
    "div",
    { className: "container" },
    createVDOM("span", { className: "count" }, state.count),
    createVDOM(
      "div",
      { className: "btn-group" },
      createVDOM(
        "button",
        { onclick: onDecreaseNumber },
        createVDOM("strong", null, "-")
      ),
      createVDOM(
        "button",
        { onclick: onResetButton },
        createVDOM("strong", null, "RESET")
      ),
      createVDOM(
        "button",
        { onclick: onIncreaseNumber },
        createVDOM("strong", null, "+")
      )
    )
  );
};

export default Counter;
