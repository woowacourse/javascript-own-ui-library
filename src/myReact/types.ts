export type MyNode = MyElementNode | MyTextNode;

export type MyTextNode = string;
export interface MyElementNode {
  tagName: string;
  props?: Record<string, any>;
  children?: (MyNode | (() => MyNode))[];
}
