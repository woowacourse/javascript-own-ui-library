import type { MyNode } from "./types";

const setStyleAttrs = (
  node: HTMLElement,
  stylesMap: Record<string, string>
) => {
  for (const key in stylesMap) {
    if (!stylesMap.hasOwnProperty(key)) continue;

    node.style[key as any] = stylesMap[key];
  }
};

const setEventAttrs = (
  node: HTMLElement,
  type: string,
  listener: () => void
) => {
  node.addEventListener(type, listener);
};

const setAttrs = (node: any, key: string | symbol | number, val: any) => {
  if (key === "styles") {
    setStyleAttrs(node, val);
    return;
  }

  if (/^on/.test(key.toString())) {
    const type = key.toString().substr(2).toLocaleLowerCase();

    setEventAttrs(node, type, val);
  }

  node[key] = val;
};

const paint = (element: MyNode, container: HTMLElement, isReplace: boolean) => {
  if (typeof element === "string") {
    isReplace ? container.replaceChildren(element) : container.append(element);
    return;
  }

  const node = document.createElement(element.tagName);

  for (const key in element.props) {
    if (!element.props.hasOwnProperty(key)) continue;

    setAttrs(node, key, element.props[key]);
  }

  for (const child of element.children!) {
    paint(child as MyNode, node, false);
  }

  isReplace ? container.replaceChildren(node) : container.append(node);
};

export default paint;
