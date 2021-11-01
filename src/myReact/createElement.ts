import type { MyElementNode } from "./types";

const createElement = (
  tagName: string,
  { props, children = [] }: Pick<MyElementNode, "props" | "children">
) => {
  const processedChildren = children.map((child) =>
    typeof child === "function" ? child() : child
  );

  return { tagName, props, children: processedChildren };
};

export default createElement;
