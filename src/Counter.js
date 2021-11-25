import { createElement as h } from "./lib/React.js";
import reactive from "./lib/reactive.js";

const Counter = () => {
  const state = reactive({
    count: 0,
    isMessageVisible: true,
  });

  const reset = () => {
    state.count = 0;
  };

  const increment = () => {
    state.count += 1;
  };

  const decrement = () => {
    state.count -= 1;
  };

  const toggle = () => {
    state.isMessageVisible = !state.isMessageVisible;
  };

  return h(
    "div",
    { className: "container" },
    h("h1", { className: "heading" }, "동동의 Counter"),

    h("span", { className: "count" }, state.count),
    h(
      "div",
      { className: "btn-group" },
      h("button", { onClick: decrement }, h("strong", null, "-")),
      h("button", { onClick: reset }, h("strong", null, "RESET")),
      h("button", { onClick: increment }, h("strong", null, "+"))
    ),
    h("button", { className: "toggle-btn", onClick: toggle }, "toggle"),
    state.isMessageVisible ? h("h2", null, "만나서 반갑습니다") : null
  );
};

export default Counter;
