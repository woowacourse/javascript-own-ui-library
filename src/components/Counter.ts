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
    { key: "0", class: "container" },
    createElement("span", { key: "01", class: "count" }, `${count}`),
    createElement(
      "div",
      { key: "02", class: "btn-group" },
      createElement(
        "button",
        { key: "020", event: { click: decrease } },
        createElement("strong", { key: "0200" }, "-")
      ),
      createElement(
        "button",
        { key: "021", event: { click: reset } },
        createElement("strong", { key: "0210" }, "RESET")
      ),
      createElement("button", { key: "022", event: { click: increase } }, createElement("strong", { key: "0220" }, "+"))
    )
  );
};

export default Counter;
