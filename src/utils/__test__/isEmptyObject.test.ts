import isEmptyObject from "../isEmptyObject";

describe("isEmptyObject Test", () => {
  test("Object가 비어있을 경우 true를 반환한다.", () => {
    const obj = {};

    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject(obj)).toBe(true);
  });

  test("Object가 비어있지 않을 경우 false를 반환한다.", () => {
    const obj = {
      test: "test",
    };

    expect(isEmptyObject({ a: 1 })).toBe(false);
    expect(isEmptyObject(obj)).toBe(false);
  });
});
