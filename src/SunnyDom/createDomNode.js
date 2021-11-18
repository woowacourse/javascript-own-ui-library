import { isEmptyObject } from '../utils/objectUtils.js';

const createDomNode = (sunnyNode) => {
  const node = document.createElement(sunnyNode.tagName);

  node.textContent = sunnyNode.textContent;

  if (sunnyNode.id) {
    node.id = sunnyNode.id;
  }

  if (sunnyNode.class) {
    node.className = sunnyNode.class;
  }

  if (sunnyNode.children.length) {
    sunnyNode.children.forEach((child) => {
      const newNode = createDomNode(child);

      node.append(newNode);
    });
  }

  if (!isEmptyObject(sunnyNode.eventListener)) {
    Object.entries(sunnyNode.eventListener).forEach(([key, listener]) => node.addEventListener(key, listener));
  }

  return node;
};

export default createDomNode;
