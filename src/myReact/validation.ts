import { MyElementNode, MyTextNode } from "./types";

export const isTextNode = (
  val: MyElementNode | MyTextNode | null
): val is MyTextNode => {
  return typeof val === "string";
};
