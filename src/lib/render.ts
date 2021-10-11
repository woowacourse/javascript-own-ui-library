import { VElement, Component } from "./@types/types";
import {
  getAttributes,
  getClasses,
  getIdCounts,
  getIds,
  getPlainText,
  getStyles,
  getTagType,
  isPlainText,
  separateTemplate,
} from "./template";
import VStorage from "./storage/storage";
import store from "./store";

function createElement(template: ReturnType<Component>, depth: number) {
  const vStorage = store.getCurrentVStorage();
  vStorage.increaseElementIndex();
  vStorage.initStateIndex();

  const [parentTemplate, childrenTemplates] = separateTemplate(template, depth);
  const noBlankParentTemplate = parentTemplate
    .replace(/\n/g, "")
    .replace(/ /g, "");

  if (getIdCounts(noBlankParentTemplate) > 1) {
    throw Error("id 가 여럿인 태그를 만들 수 없습니다");
  }

  if (
    childrenTemplates.some(
      (childrenTemplate) => getIdCounts(childrenTemplate) > 1
    )
  ) {
    throw Error("자식 태그 중 id 가 여럿인 태그가 있습니다");
  }

  const element: VElement = {
    type: "div",
    attribute: {},
    style: {},
    children: [],
    dataset: {},
  };

  if (childrenTemplates.length > 0) {
    if (
      childrenTemplates.length !== 1 &&
      childrenTemplates.some((childrenTemplate) =>
        isPlainText(childrenTemplate)
      )
    ) {
      throw Error(
        "텍스트 자식 노드는 하나만 생성할 수 있으며 다른 엘리먼트들과 형제가 될수 없습니다"
      );
    }

    const [firstChildTemplate] = childrenTemplates;

    if (childrenTemplates.length === 1 && isPlainText(firstChildTemplate)) {
      element.children = getPlainText(firstChildTemplate);
    } else {
      element.children = childrenTemplates.map((childrenTemplate) =>
        createElement(childrenTemplate, depth + 1)
      );
    }
  }

  const tagType = getTagType(noBlankParentTemplate);
  element.type = tagType;

  const Ids = getIds(noBlankParentTemplate);

  if (Ids) {
    const [id] = Ids;
    element.attribute.id = id;
  }

  const classes = getClasses(noBlankParentTemplate);

  if (classes) {
    element.attribute.class = classes.join(" ");
  }

  const attributes = getAttributes(noBlankParentTemplate);

  if (attributes) {
    attributes.forEach(([attributeName, attributeValue]) => {
      element.attribute[attributeName] = attributeValue;
    });
  }

  const styles = getStyles(noBlankParentTemplate);

  if (styles) {
    styles.forEach(([styleName, styleValue]) => {
      element.style[styleName] = styleValue;
    });
  }

  return element;
}

function createHTMLElement(element: VElement): HTMLElement {
  const { type, attribute, style, children } = element;
  const vStorage = store.getCurrentVStorage();
  const elementIndex = vStorage.getCurrentElementIndex();

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

  HTMLElement.setAttribute("data-element-index", String(elementIndex));

  vStorage.setElement(elementIndex, HTMLElement);
  vStorage.increaseElementIndex();

  return HTMLElement;
}

function setEvents(
  $root: Element,
  handlerStorage: VStorage["handlerStorage"]
) {}

function renderHTML($root: Element, rootElement: VElement, isInitial: boolean) {
  const rootHTMLElement = createHTMLElement(rootElement);

  if (isInitial) {
    $root.appendChild(rootHTMLElement);
  } else {
    $root.replaceChild(rootHTMLElement, $root.firstChild!);
  }
}

function render($root: Element, rootComponent: Component) {
  store.setCurrentRootId($root.id);

  const rootTemplate = rootComponent();
  const rootElement = createElement(rootTemplate, 1);
  const latestVDom: VElement = rootElement;
  const vStorage = store.getCurrentVStorage();
  const vDom = vStorage.getVDom();

  vStorage.initElementIndex();

  if (vDom) {
    vStorage.updater(latestVDom, () => {
      renderHTML($root, rootElement, false);
    });

    return;
  }

  vStorage.setVDom(rootElement);
  renderHTML($root, rootElement, true);
  vStorage.initElementIndex();

  console.log(vStorage.getStateStorage());

  setEvents($root, vStorage.getHandlerStorage());
}

export default function initRenderer(
  $root: Element | null,
  rootComponent: Component
) {
  if (!$root) {
    throw Error("존재하지 않는 루트 태그입니다");
  }

  const vStorage = new VStorage();

  store.addRenderer($root.id, () => render($root, rootComponent));
  store.addVStorage($root.id, vStorage);

  render($root, rootComponent);
}
