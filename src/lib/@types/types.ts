import { attributeNameList, tagTypeList } from "../constants";

export type TagType = typeof tagTypeList[number];
export type AttributeName = typeof attributeNameList[number];
export type StyleName = keyof Omit<CSSStyleDeclaration, number>;
export type DomEvent = keyof GlobalEventHandlersEventMap;
export type Component = (props?: any) => string;
export type Renderer = () => void;

export interface VElement {
  type: TagType;
  attribute: {
    [key in AttributeName]?: string;
  };
  style: {
    [key in StyleName]?: string;
  };
  children: string | Array<VElement>;
}

export interface Handler {
  template: string;
  callback: Function;
}

export type StateStorage = {
  [key: number]: any;
};

export type HandlerStorage = {
  [event in DomEvent]?: Handler[];
};

export type HTMLElementStorage = {
  [key: number]: HTMLElement;
};
