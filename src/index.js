import createVDOM from "./lib/createVDOM.js";
import render from "./lib/render.js";
import store from "./lib/store.js";

const rootElement = document.querySelector("#root");
const state = store({ count: 0 }, () => render(Element()));

const Element = () => {
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

function onDecreaseNumber() {
  state.count -= 1;
}

function onResetButton() {
  state.count = 0;
}

function onIncreaseNumber() {
  state.count += 1;
}

// 초기 rendering
render(Element(), rootElement);
