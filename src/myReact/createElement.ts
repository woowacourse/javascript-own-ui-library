import type { MyElementNode } from "./types";

const createElement = (
  tagName: string,
  { props, children = [] }: Pick<MyElementNode, "props" | "children">
) => {
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === "function") {
      children.splice(i, 1, (children[i] as Function)());
    }
  }

  return { tagName, props, children };
};

export default createElement;
