import { createRealNode, setEvent, setStyleAttrs } from "./createRealNode";
import type { MyElementNode, MyTextNode } from "./types";
import { isTextNode } from "./validation";

const diff = (
  parentRealNode: HTMLElement,
  realNode: HTMLElement,
  oldNode: MyElementNode | MyTextNode,
  newNode: MyElementNode | MyTextNode
) => {
  // 1. TextNode인 경우
  if (isTextNode(newNode)) {
    if (oldNode !== newNode) {
      parentRealNode.textContent = newNode;
    }
    return;
  }

  if (isTextNode(oldNode)) {
    realNode.replaceWith(createRealNode(newNode));
    return;
  }

  // // 2. tagname이 다르면 전부 갈아치움
  if (realNode.tagName.toLowerCase() !== newNode.tagName) {
    realNode.replaceWith(createRealNode(newNode));
    return;
  }

  // 3. prop이 다른 경우
  for (const key in newNode.props) {
    if (!newNode.props.hasOwnProperty(key)) continue;

    if (oldNode.props![key] === newNode.props[key]) continue;

    //event인경우
    if (/^on/.test(key.toString())) {
      setEvent(
        realNode as HTMLElement,
        key,
        newNode.props[key],
        oldNode.props![key]
      );
      continue;
    }

    //style인 경우
    if (key === "style") {
      setStyleAttrs(realNode as HTMLElement, newNode.props.styles);
      continue;
    }

    (realNode as any)[key] = newNode.props[key];
  }

  // 4. children 수 증감 비교
  if (oldNode.children?.length !== newNode.children?.length) {
    realNode.replaceWith(createRealNode(newNode));
    return;
  }

  for (let i = 0; i < (newNode.children?.length || 0); i++) {
    diff(
      realNode,
      realNode.children[i] as HTMLElement,
      oldNode.children![i],
      newNode.children![i]
    );
  }
};

export default diff;
