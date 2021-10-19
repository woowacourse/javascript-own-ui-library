import createVDOM from "./lib/createVDOM.js";
import render from "./lib/render.js";

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
      createVDOM("button", { onclick: onDecreaseNumber }, "-"),
      createVDOM("button", { onclick: onResetButton }, "RESET"),
      createVDOM("button", { onclick: onIncreaseNumber }, "+")
    )
  );
};

function onDecreaseNumber() {
  count--;
  updateDOM(Element(), rootElement);
}

function onResetButton() {
  count = 0;
  updateDOM(Element(), rootElement);
}

function onIncreaseNumber() {
  count++;
  updateDOM(Element(), rootElement);
}

// 초기 rendering
render(Element(), rootElement);

function updateDOM(VDOM, rootElement) {
  // 전체 리렌더링을 하고 있어서, 초기화 해주는 작업이 필요해서 추가한 코드
  rootElement.innerHTML = "";
  render(VDOM, rootElement);
}
