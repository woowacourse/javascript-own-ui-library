import { TagType, AttributeName, StyleName } from "./@types/types";
import {
  tagTypeList,
  attributeNameList,
  styleNameList,
  idSeparatorUnit,
} from "./constants";
import { contains } from "./@types/guards";
import { getRegExp } from "./utils";

export const isPlainText = (template: string) => {
  return template.substring(0, 5) === "text:";
};

export const hasChildren = (template: string) => {
  if (isPlainText(template)) {
    return;
  }

  return template.includes(")");
};

export const isTagType = (tagType: string): tagType is TagType => {
  if (contains(tagTypeList, tagType)) {
    return true;
  }

  return false;
};

export const hasWrongAttributeName = (
  attributeNames: string[]
): attributeNames is AttributeName[] => {
  return attributeNames.some(
    (attributeName) =>
      !contains<AttributeName>(attributeNameList, attributeName)
  );
};

export const isAttributes = (
  attributes: string[][]
): attributes is [AttributeName, string][] => {
  const attributeNames = attributes.map(([attributeName]) => attributeName);

  if (attributes.some((attribute) => attribute.length > 2)) {
    return false;
  }

  if (hasWrongAttributeName(attributeNames)) {
    return false;
  }

  return true;
};

export const hasWrongStyleName = (styleNames: string[]) => {
  return styleNames.some(
    (styleName) => !contains<StyleName>(styleNameList, styleName)
  );
};

export const isStyleName = (
  styles: string[][]
): styles is [StyleName, string][] => {
  const styleNames = styles.map(([styleName]) => styleName);

  if (styles.some((style) => style.length > 2)) {
    return false;
  }

  if (hasWrongStyleName(styleNames)) {
    return false;
  }

  return true;
};

export const separateTemplate = (
  template: string,
  depth: number
): [string, string[]] => {
  const depthString = String(depth);
  const separator = `(${depthString})`;
  const separatorIndex = template.indexOf(separator);
  const parentTemplate = template.substring(0, separatorIndex);

  const childrenTemplates = getChildrenTemplates(template, separator);

  const childrenTemplate = template.substring(
    separatorIndex + 1,
    template.length
  );

  return [parentTemplate, childrenTemplates];
};

export const getChildrenTemplates = (template: string, separator: string) => {
  return template.match(getRegExp(``)) ?? [];
};

export const getTagType = (template: string) => {
  const [tagType] = template.split(/[\#,\.,\@,\$]/);

  if (!isTagType(tagType)) {
    throw Error("올바르지 않은 tag 타입입니다!");
  }

  return tagType;
};

export const getIdCounts = (template: string) => {
  return template.split("").filter((char) => char === idSeparatorUnit).length;
};

export const getIds = (template: string) => {
  const idStrings = template.match(/\#([0-9]|[A-Z]|[a-z])*/g);

  if (!idStrings) {
    return null;
  }

  return idStrings.map((idString) => idString.substr(1));
};

export const getClasses = (template: string) => {
  const classStrings = template.match(/\.([0-9]|[A-Z]|[a-z])*/g);

  if (!classStrings) {
    return null;
  }

  return classStrings.map((classString) => classString.substr(1));
};

export const getAttributes = (template: string) => {
  const attributeStrings = template.match(/\@([0-9]|[A-Z]|[a-z]|[-]|[:])*/g);

  if (!attributeStrings) {
    return null;
  }

  const attributes = attributeStrings.map((attribute) => attribute.split(":"));

  if (!isAttributes(attributes)) {
    throw Error("올바르지 않은 attribute 형식이 들어있습니다!");
  }

  return attributes;
};

export const getStyles = (template: string) => {
  const styleStrings = template.match(/\$([0-9]|[A-Z]|[a-z]|[-]|[:])*/g);

  if (!styleStrings) {
    return null;
  }

  const styles = styleStrings.map((attribute) =>
    attribute.substr(1).split(":")
  );

  if (!isStyleName(styles)) {
    throw Error("올바르지 않은 style 형식이 들어있습니다!");
  }

  return styles;
};

export const getChildren = (template: string) => {};
