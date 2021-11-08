import { AttributeName, StyleName, VElement } from "../@types/types";
import {
  getAttributes,
  getClasses,
  getIds,
  getPlainText,
  getStyles,
  getTagType,
  isPlainText,
} from "../template";

export const getVElementProperty = (noBlankParentTemplate: string) => {
  const tagType = getTagType(noBlankParentTemplate);
  const [id] = getIds(noBlankParentTemplate) ?? [null];
  const classes = getClasses(noBlankParentTemplate);
  const attributes = getAttributes(noBlankParentTemplate);
  const styles = getStyles(noBlankParentTemplate);

  return {
    tagType,
    id,
    classes,
    attributes,
    styles,
  };
};

export const getHTMLElementStyles = (style: VElement["style"]) => {
  return Object.keys(style)
    .map((styleName) => `${styleName}:${style[styleName]}`)
    .join(";");
};

export const getAttributeSelector = (
  attributes: [AttributeName, string][] | null
) => {
  if (attributes === null) {
    return "";
  }

  return attributes
    .map(
      ([attributeName, attributeValue]) =>
        `[${attributeName}="${attributeValue}"]`
    )
    .join("");
};

export const getStyleSelector = (styles: [StyleName, string][] | null) => {
  if (styles === null) {
    return "";
  }

  return `[style="${styles
    .map(([styleName, styleValue]) => `${styleName}:${styleValue}`)
    .join(";")}"]`;
};

export const getElementSelector = (template: string) => {
  const { attributes, classes, id, styles, tagType } =
    getVElementProperty(template);

  const idSelector = id ? `[id="${id}"]` : "";
  const classSelector = classes ? `[class="${classes?.join(" ")}"]` : "";
  const attributeSelector = getAttributeSelector(attributes);
  const styleSelector = getStyleSelector(styles);

  return `${tagType}${idSelector}${classSelector}${attributeSelector}${styleSelector}`;
};

export const isClassNamesExist = (element: HTMLElement, classes: string[]) =>
  Array.from(element.classList).every((className) =>
    classes.includes(className)
  );
export const isAllAttributesMatch = (
  element: HTMLElement,
  attributes: [AttributeName, string][]
) =>
  attributes.every(
    ([attributeName, attributeValue]) =>
      element.getAttribute(attributeName) === attributeValue
  );
export const isAllStyleMatch = (
  element: HTMLElement,
  styles: [StyleName, string][]
) =>
  styles.every(
    ([styleName, styleValue]) => element.style[styleName] === styleValue
  );

export const setVElementProperty = (
  vElement: VElement,
  elementInfo: ReturnType<typeof getVElementProperty>
) => {
  const { attributes, classes, id, styles, tagType } = elementInfo;
  vElement.type = tagType;

  if (id) {
    vElement.attribute.id = id;
  }

  if (classes) {
    vElement.attribute.class = classes.join(" ");
  }

  if (attributes) {
    attributes.forEach(([attributeName, attributeValue]) => {
      vElement.attribute[attributeName] = attributeValue;
    });
  }

  if (styles) {
    styles.forEach(([styleName, styleValue]) => {
      vElement.style[styleName] = styleValue;
    });
  }
};

export const setHTMLElementAttributes = (
  Element: Element,
  attribute: VElement["attribute"]
) => {
  Object.keys(attribute).forEach((attributeName) => {
    // TODO : 여기 as string 어떻게 지우지?
    Element.setAttribute(attributeName, attribute[attributeName] as string);
  });
};
