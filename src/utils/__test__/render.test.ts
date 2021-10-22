/**
 * @jest-environment jsdom
 */

import render from "../render";

describe("render Test", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("", () => {
    // const element = createElement("div", {}, "Hello World");
    // document.body.appendChild(element);
    // expect(document.body.innerHTML).toBe("<div>Hello World</div>");
  });
});
