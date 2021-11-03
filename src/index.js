import createVDOM from "./lib/createVDOM.js";
import render from "./lib/render.js";
import rerender from "./lib/rerender.js";

let count = 0;
const rootElement = document.querySelector("#root");

const Element = () => {
  return createVDOM(
    "div",
    { className: "container" },
    createVDOM("span", { className: "count" }, count),
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

function onDecreaseNumber() {
  count--;
  rerender(Element(), rootElement);
}

function onResetButton() {
  count = 0;
  rerender(Element(), rootElement);
}

function onIncreaseNumber() {
  count++;
  rerender(Element(), rootElement);
}

// 초기 rendering
render(Element(), rootElement);
