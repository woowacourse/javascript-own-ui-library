/**
 * @jest-environment jsdom
 */

import createElement from "../createElement";

describe("createElement Test", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("depth가 1인 element를 생성할 수 있다.", () => {
    const element = createElement("div", {}, "Hello World");

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe("<div>Hello World</div>");
  });

  test("depth가 2인 element를 생성할 수 있다.", () => {
    const element = createElement("div", {}, createElement("span", {}, "Hello World"));

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe("<div><span>Hello World</span></div>");
  });

  test("depth가 3인 element를 생성할 수 있다.", () => {
    const element = createElement("div", {}, createElement("div", {}, createElement("span", {}, "Hello World")));

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe(`<div><div><span>Hello World</span></div></div>`);
  });

  test("child가 2개인 element를 생성할 수 있다.", () => {
    const element = createElement("div", {}, createElement("div", {}, ""), createElement("span", {}, "Hello World"));

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe(`<div><div></div><span>Hello World</span></div>`);
  });

  test("child가 3개인 element를 생성할 수 있다.", () => {
    const element = createElement(
      "div",
      {},
      createElement("div", {}, ""),
      createElement("span", {}, "Hello World"),
      "HELLO"
    );

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe(`<div><div></div><span>Hello World</span>HELLO</div>`);
  });

  test("child가 2개이면서 depth가 2인 element를 생성할 수 있다.", () => {
    const element = createElement(
      "div",
      {},
      createElement("div", {}, ""),
      createElement("span", {}, createElement("div", {}, "Hello World"))
    );

    document.body.appendChild(element);

    expect(document.body.innerHTML).toBe(`<div><div></div><span><div>Hello World</div></span></div>`);
  });
});
