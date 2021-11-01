/**
 * @jest-environment jsdom
 */

import createElement from "../createElement";
import render from "../render";

describe("render Test", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
  });

  test("node를 전달 받아 target에 node를 렌더할 수 있다.", () => {
    const $root = document.querySelector("#root");
    const node = createElement(
      "div",
      { class: "container" },
      createElement("span", { class: "count" }, "0"),
      createElement(
        "div",
        { class: "btn-group" },
        createElement("button", {}, createElement("strong", {}, "-")),
        createElement("button", {}, createElement("strong", {}, "RESET")),
        createElement("button", {}, createElement("strong", {}, "+"))
      )
    );

    render($root, node);
    expect(document.body.innerHTML).toBe(
      '<div id="root"><div class="container"><span class="count">0</span><div class="btn-group"><button><strong>-</strong></button><button><strong>RESET</strong></button><button><strong>+</strong></button></div></div></div>'
    );
  });
});
