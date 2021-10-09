import { isEmptyObject } from './utils/objectUtils.js';

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

const render = (element, prevElement) => {
  /* elem, prevElement 비교 */

  const current = createDomNode(element);

  console.log(current);

  /* 변경사항이 감지되면 무조건 전체 갈아끼움. */
  document.querySelector('#root').innerHTML = '';
  document.querySelector('#root').append(current);

  // console.dir(prevElement);
};

export default render;
