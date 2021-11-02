export type MyTextNode = string;

export interface MyElementNode {
  tagName: string;
  props?: Record<string, any>;
  children?: (MyElementNode | MyTextNode)[];
}
