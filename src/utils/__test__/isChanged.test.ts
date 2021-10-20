/**
 * @jest-environment jsdom
 */

import isChanged from "../isChanged";

describe("diff Test", () => {
  test("두 노드가 다른 경우 true를 반환한다.", () => {
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");

    element1.setAttribute("id", "test1");
    element2.setAttribute("id", "test2");

    expect(isChanged(element1, element2)).toBe(true);

    const element3 = document.createElement("span");
    const element4 = document.createElement("span");

    element3.innerHTML = "0";
    element4.innerHTML = "1";

    expect(isChanged(element3, element4)).toBe(true);

    const element5 = document.createElement("span");
    const element6 = document.createElement("span");

    element5.className = "one";
    element6.className = "two";

    expect(isChanged(element5, element6)).toBe(true);
  });

  test("두 노드가 같은 경우 false를 반환한다.", () => {
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");

    element1.setAttribute("id", "test");
    element2.setAttribute("id", "test");

    expect(isChanged(element1, element2)).toBe(false);

    const element3 = document.createElement("div");
    const element4 = document.createElement("div");

    element3.innerHTML = "0";
    element4.innerHTML = "0";

    expect(isChanged(element3, element4)).toBe(false);
  });
});
