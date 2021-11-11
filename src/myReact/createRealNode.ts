import { MyElementNode, MyTextNode } from "./types";
import { isTextNode } from "./validation";

export const setStyleAttrs = (
  node: HTMLElement | null,
  stylesMap: Record<string, string>
) => {
  if (!node) return;

  for (const key in stylesMap) {
    if (!stylesMap.hasOwnProperty(key)) continue;

    node.style[key as any] = stylesMap[key];
  }
};

export const setEvent = (
  node: HTMLElement,
  key: string | number,
  callback: () => void,
  oldCallback?: () => void
) => {
  const type = key.toString().substr(2).toLocaleLowerCase();

  if (oldCallback) {
    node.removeEventListener(type, oldCallback);
  }

  node.addEventListener(type, callback);
};

const setAttrs = (node: any, key: string | number, val: any) => {
  if (key === "style") {
    setStyleAttrs(node, val);
    return;
  }

  if (/^on/.test(key.toString())) {
    setEvent(node, key, val);
    return;
  }

  node[key] = val;
};

const _createRealNode = (
  container: Element | null,
  element: MyElementNode | MyTextNode | null,
  isReplace: boolean
) => {
  if (!element || !container) return;

  if (isTextNode(element)) {
    isReplace ? container.replaceChildren(element) : container.append(element);
    return;
  }

  const node = document.createElement(element.tagName);

  for (const key in element.props) {
    if (!element.props.hasOwnProperty(key)) continue;

    setAttrs(node, key, element.props[key]);
  }

  for (const child of element.children!) {
    _createRealNode(node, child, false);
  }

  isReplace ? container.replaceChildren(node) : container.append(node);

  return node;
};

export const createRealNode = (VNode: MyElementNode): HTMLElement => {
  const node = document.createElement("div");

  _createRealNode(node, VNode, true);

  return node.children[0] as HTMLElement;
};

export default createRealNode;
