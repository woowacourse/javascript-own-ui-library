import { createElement as h } from "./lib/React.js";
import createStateMachine from "./lib/StateMachine.js";

const [get, set, init] = createStateMachine();

const Counter = () => {
  init({ count: 0, isMessageVisible: true });

  const { count, isMessageVisible } = get();

  const reset = () => set("count", 0);
  const increment = () => set("count", (prev) => prev + 1);
  const decrement = () => set("count", (prev) => prev - 1);
  const toggle = () => set("isMessageVisible", (prev) => !prev);

  return h(
    "div",
    { className: "container" },
    h("h1", { className: "heading" }, "동동의 Counter"),

    h("span", { className: "count" }, count),
    h(
      "div",
      { className: "btn-group" },
      h("button", { onClick: decrement }, h("strong", null, "-")),
      h("button", { onClick: reset }, h("strong", null, "RESET")),
      h("button", { onClick: increment }, h("strong", null, "+"))
    ),
    h("button", { className: "toggle-btn", onClick: toggle }, "toggle"),
    isMessageVisible ? h("h2", null, "만나서 반갑습니다") : null
  );
};

export default Counter;
