import {
  attributeNameList,
  styleNameList,
  tagTypeList,
  domEventList,
} from "../constants";

export type TagType = typeof tagTypeList[number];
export type AttributeName = typeof attributeNameList[number];
export type StyleName = typeof styleNameList[number];
export type DomEvent = typeof domEventList[number];

export interface ChrisElement {
  type: TagType;
  attribute: {
    [key in AttributeName]?: string;
  };
  style: {
    [key in StyleName]?: string;
  };
  dataset: {
    [key: string]: string;
  };
  children: string | Array<ChrisElement>;
}

type EventHandler = {
  event: DomEvent;
  handler: Function;
};

export type Component = (props?: any) => string;

// export type Component = (props?: any) => {
//   template: string;
//   eventHandlers?: EventHandler[];
//   children?: string[];
// };
