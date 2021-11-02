import type { MyElementNode } from "./types";

const createElement = (
  tagName: string | ((props?: Pick<MyElementNode, "props">) => MyElementNode),
  { props, children = [] }: Pick<MyElementNode, "props" | "children"> = {}
) => {
  if (typeof tagName === "function") {
    return tagName(props);
  }

  return { tagName, props, children };
};

export default createElement;
