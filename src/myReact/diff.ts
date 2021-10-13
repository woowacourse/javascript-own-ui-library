import type { MyNode } from "./types";

const diff = (oldNode: MyNode, newNode: MyNode) => {
  // 1. TextNode인 경우
  if (typeof oldNode === "string" || typeof newNode === "string") {
    return oldNode !== newNode;
  }

  // 2. tagname이 다르면 전부 갈아치움
  if (oldNode.tagName !== newNode.tagName) {
    return true;
  }

  // 3. prop이 다른 경우
  if (JSON.stringify(oldNode.props) !== JSON.stringify(newNode.props)) {
    return true;
  }

  // 4. children 수 증감 비교
  if (oldNode.children?.length !== newNode.children?.length) {
    return true;
  }

  for (let i = 0; i < (newNode.children?.length || 0); i++) {
    const hasDifference = diff(
      oldNode.children![i] as MyNode,
      newNode.children![i] as MyNode
    );

    if (hasDifference) return true;
  }

  return false;
};

export default diff;
