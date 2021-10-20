/**
 * @jest-environment jsdom
 */

import createElement from "../createElement";

describe("createElement Test", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("depth가 1안 children을 가진 Element를 생성할 수 있다.", () => {
    const element = createElement("div", {}, "Hello World");

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe("<div>Hello World</div>");
  });

  test("depth가 2인 children을 가진 Element를 생성할 수 있다.", () => {
    const element = createElement(
      "div",
      {},
      createElement("span", {}, "Hello World")
    );

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe("<div><span>Hello World</span></div>");
  });

  test("depth가 3인 children을 가진 Element를 생성할 수 있다.", () => {
    const element = createElement(
      "div",
      {},
      createElement("div", {}, createElement("span", {}, "Hello World"))
    );

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe(
      "<div><div><span>Hello World</span></div></div>"
    );
  });
});
