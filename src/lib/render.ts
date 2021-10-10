import { AttributeName, ChrisElement, Component } from "./@types/types";
import {
  getAttributes,
  getClasses,
  getIdCounts,
  getIds,
  getStyles,
  getTagType,
  isPlainText,
  separateTemplate,
} from "./template";
import Root from "../components/Root";

function createElement(template: ReturnType<Component>, depth: number) {
  if (getIdCounts(template) > 1) {
    throw Error("id 가 여럿인 태그를 만들 수 없습니다");
  }

  const element: ChrisElement = {
    type: "div",
    attribute: {},
    style: {},
    children: [],
    dataset: {},
  };

  // const [parentTemplate, childrenTemplates] = separateTemplate(template, depth);

  // if (isPlainText(childrenTemplate)) {
  //   element.children = childrenTemplate
  // } else {
  //   const childrenElement = createElement(childrenTemplate, depth + 1)

  // }

  const noBlankTemplate = template.replace(/ /g, "");

  console.log(noBlankTemplate);

  const tagType = getTagType(noBlankTemplate);
  element.type = tagType;

  const Ids = getIds(noBlankTemplate);

  if (Ids) {
    const [id] = Ids;
    element.attribute.id = id;
  }

  const classes = getClasses(noBlankTemplate);

  if (classes) {
    element.attribute.class = classes.join(" ");
  }

  const attributes = getAttributes(noBlankTemplate);

  if (attributes) {
    attributes.forEach(([attributeName, attributeValue]) => {
      element.attribute[attributeName] = attributeValue;
    });
  }

  const styles = getStyles(noBlankTemplate);

  if (styles) {
    styles.forEach(([styleName, styleValue]) => {
      element.style[styleName] = styleValue;
    });
  }

  // if (typeof children === "string") {
  //   element.children = children;
  // }

  // if (Array.isArray(children)) {
  //   element.children = children.map((child) => createElement(child));
  // }

  return element;
}

function createHTMLElement(element: ChrisElement): HTMLElement {
  const { type, attribute, style, children } = element;

  const HTMLElement = document.createElement(type);
  Object.keys(attribute).forEach((attributeName) => {
    // TODO : 여기 as string 어떻게 지우지?
    HTMLElement.setAttribute(attributeName, attribute[attributeName] as string);
  });

  const elementStyles = Object.keys(style)
    .map((styleName) => `${styleName}:${style[styleName]}`)
    .join(";");
  HTMLElement.setAttribute("style", elementStyles);

  if (typeof children === "string") {
    HTMLElement.appendChild(document.createTextNode(children));
  } else {
    children.forEach((child) => {
      HTMLElement.appendChild(createHTMLElement(child));
    });
  }

  return HTMLElement;
}

function setEvents() {}

function compare(prevElement: ChrisElement, Element: ChrisElement) {}

function initRender() {}

export default function render(id: string) {
  const $root = document.querySelector(id);

  const rootComponent = Root();
  const rootElement = createElement(rootComponent, 1);
  const rootHTMLElement = createHTMLElement(rootElement);

  $root!.appendChild(rootHTMLElement);
  setEvents();
}
