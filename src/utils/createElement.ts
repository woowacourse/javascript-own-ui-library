import type { MyElementNode } from "./types";

const createElement = (
  tagName: string,
  { props, children }: Pick<MyElementNode, "props" | "children">
) => ({
  tagName,
  props,
  children,
});

export default createElement;
