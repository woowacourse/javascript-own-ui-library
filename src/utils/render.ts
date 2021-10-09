import type { MyNode } from "./types";

let old: MyNode | null = null;

const sync = (element: MyNode, container: Element) => {
  if (typeof element === "string") {
    container.innerHTML += element;
    return;
  }

  const node: any = document.createElement(element.tagName);

  for (const key in element.props) {
    node[key] = element.props[key];
  }

  for (const child of element.children!) {
    render(child, node);
  }

  container.append(node);
};

const render = (element: MyNode, container: Element) => {
  if (old) {
    // 비교 알고리즘
  }

  sync(element, container);

  old = element;
};

export default render;
