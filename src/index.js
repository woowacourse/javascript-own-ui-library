import createVDOM from "./lib/createVDOM.js";
import render from "./lib/render.js";

let count = 0;

const Element = () => {
  return createVDOM(
    "div",
    { className: "container" },
    createVDOM("span", { className: "count" }, count),
    createVDOM(
      "div",
      { className: "btn-group" },
      createVDOM("button", { onclick: onDecreaseNumber }, "-"),
      createVDOM("button", { onclick: onResetButton }, "RESET"),
      createVDOM("button", { onclick: onIncreaseNumber }, "+")
    )
  );
};

function onDecreaseNumber() {
  count--;
}

function onResetButton() {
  count = 0;
}

function onIncreaseNumber() {
  count++;
}

const rootElement = document.querySelector("#root");
render(Element(), rootElement);
