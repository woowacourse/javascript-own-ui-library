import createElement from "../utils/createElement";
import render from "../utils/render";

const $root = document.getElementById("root");

let count = 0;

const increase = () => {
  ++count;
  render($root, Counter());
};

const decrease = () => {
  --count;
  render($root, Counter());
};
const reset = () => {
  count = 0;
  render($root, Counter());
};

const Counter = () => {
  return createElement(
    "div",
    { class: "container" },
    createElement("span", { class: "count" }, `${count}`),
    createElement(
      "div",
      { class: "btn-group" },
      createElement(
        "button",
        { event: { click: decrease } },
        createElement("strong", {}, "-")
      ),
      createElement(
        "button",
        { event: { click: reset } },
        createElement("strong", {}, "RESET")
      ),
      createElement(
        "button",
        { event: { click: increase } },
        createElement("strong", {}, "+")
      )
    )
  );
};

export default Counter;
