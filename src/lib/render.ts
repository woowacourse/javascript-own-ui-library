import { Component, VElement } from "./@types/types";
import VStorage from "./storage/storage";
import store from "./store";
import {
  getIdCounts,
  getPlainText,
  isPlainText,
  separateTemplate,
} from "./template";
import {
  getElementSelector,
  getHTMLElementStyles,
  getVElementProperty,
  isAllAttributesMatch,
  isAllStyleMatch,
  isClassNamesExist,
  setHTMLElementAttributes,
  setVElementProperty,
} from "./utils/utils";

const setVElementChildren = (
  vElement: VElement,
  childrenTemplates: string[],
  parentDepth: number
) => {
  if (childrenTemplates.length === 0) {
    return;
  }

  if (
    childrenTemplates.length !== 1 &&
    childrenTemplates.some((childrenTemplate) => isPlainText(childrenTemplate))
  ) {
    throw Error(
      "텍스트 자식 노드는 하나만 생성할 수 있으며 다른 엘리먼트들과 형제가 될수 없습니다"
    );
  }

  const [firstChildTemplate] = childrenTemplates;

  if (childrenTemplates.length === 1 && isPlainText(firstChildTemplate)) {
    vElement.children = getPlainText(firstChildTemplate);
  } else {
    vElement.children = childrenTemplates.map((childrenTemplate) =>
      createVElement(childrenTemplate, parentDepth + 1)
    );
  }
};

const setHTMLElementChildren = (
  HTMLElement: HTMLElement,
  children: VElement["children"]
) => {
  if (typeof children === "string") {
    HTMLElement.appendChild(document.createTextNode(children));
  } else {
    children.forEach((child) => {
      HTMLElement.appendChild(createHTMLElement(child));
    });
  }
};

const createVElement = (template: ReturnType<Component>, depth: number) => {
  const [parentTemplate, childrenTemplates] = separateTemplate(template, depth);
  const noBlankParentTemplate = parentTemplate
    .replace(/\n/g, "")
    .replace(/ /g, "");

  if (getIdCounts(noBlankParentTemplate) > 1) {
    throw Error("id 가 여럿인 태그를 만들 수 없습니다");
  }

  const vElement: VElement = {
    type: "div",
    attribute: {},
    style: {},
    children: [],
  };

  setVElementProperty(vElement, getVElementProperty(noBlankParentTemplate));
  setVElementChildren(vElement, childrenTemplates, depth);

  return vElement;
};

const createHTMLElement = (vElement: VElement): HTMLElement => {
  const { type, attribute, style, children } = vElement;
  const vStorage = store.getCurrentVStorage();
  vStorage.increaseElementIndex();
  const elementIndex = vStorage.getElementIndex();
  const HTMLElement = document.createElement(type);

  setHTMLElementAttributes(HTMLElement, attribute);
  HTMLElement.setAttribute("data-element-index", String(elementIndex));

  const elementStyles = getHTMLElementStyles(style);
  HTMLElement.setAttribute("style", elementStyles);

  setHTMLElementChildren(HTMLElement, children);

  vStorage.setElement(elementIndex, HTMLElement);

  return HTMLElement;
};

const checkEventBindings = () => {
  const vStorage = store.getCurrentVStorage();
  const handlerStorage = vStorage.getHandlerStorage();

  Object.keys(handlerStorage).forEach((event) => {
    const eventHandlers = handlerStorage[event];
    eventHandlers?.forEach((handler) => {
      const selector = getElementSelector(handler.template);

      if (!document.querySelector(selector)) {
        throw Error(`${handler.template}에 해당하는 요소를 찾을 수 없습니다`);
      }
    });
  });
};

const renderHTML = (
  $root: Element,
  rootElement: VElement,
  isInitial: boolean
) => {
  const rootHTMLElement = createHTMLElement(rootElement);

  if (isInitial) {
    $root.appendChild(rootHTMLElement);
  } else {
    $root.replaceChild(rootHTMLElement, $root.firstChild!);
  }
};

const render = ($root: Element, rootComponent: Component) => {
  store.setCurrentRootId($root.id);
  const vStorage = store.getCurrentVStorage();
  vStorage.initElementIndex();
  vStorage.initStateIndex();

  const rootTemplate = rootComponent();
  const rootElement = createVElement(rootTemplate, 1);
  const latestVDom: VElement = rootElement;
  const vDom = vStorage.getVDom();

  vStorage.initElementIndex();

  if (vDom) {
    vStorage.compare(latestVDom, () => {
      renderHTML($root, rootElement, false);
    });
    vStorage.initElementIndex();
    vStorage.setVDom(rootElement);

    return;
  }

  vStorage.setVDom(rootElement);
  renderHTML($root, rootElement, true);

  checkEventBindings();
};

export default function initRenderer(
  $root: Element | null,
  rootComponent: Component
) {
  if (!$root) {
    throw Error("존재하지 않는 루트 태그입니다");
  }

  const vStorage = new VStorage($root);

  store.addRenderer($root.id, () => render($root, rootComponent));
  store.addVStorage($root.id, vStorage);

  render($root, rootComponent);
}
