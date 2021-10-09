import type { MyElement } from "./types";

const render = (element: MyElement | string, container: Element) => {
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

export default render;
