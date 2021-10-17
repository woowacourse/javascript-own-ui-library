import { createElement as h } from "./lib/React.js";
import createStateMachine from "./lib/StateMachine.js";

const [get, set] = createStateMachine({ count: 0 });

const Counter = () => {
  const { count } = get();

  const reset = () => set("count", 0);
  const increment = () => set("count", (prev) => prev + 1);
  const decrement = () => set("count", (prev) => prev - 1);

  return h(
    "div",
    { className: "container" },
    h("span", { className: "count" }, count),
    h(
      "div",
      { className: "btn-group" },
      h("button", { onClick: decrement }, h("strong", undefined, "-")),
      h("button", { onClick: reset }, h("strong", undefined, "RESET")),
      h("button", { onClick: increment }, h("strong", undefined, "+"))
    )
  );
};

export default Counter;
