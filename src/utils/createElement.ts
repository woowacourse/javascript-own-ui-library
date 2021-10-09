import type { MyElement } from "./types";

const createElement = (
  tagName: string,
  { props, children }: Pick<MyElement, "props" | "children">
) => ({
  tagName,
  props,
  children,
});

export default createElement;
