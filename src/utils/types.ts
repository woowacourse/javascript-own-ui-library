export interface MyElement {
  tagName: string;
  props?: Record<string, any>;
  children?: (MyElement | string)[];
}
