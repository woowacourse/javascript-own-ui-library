import diff from './diff.js';
import Sunny from './Sunny.js';
import idGenerator from './utils/idGenerator.js';
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

const findElement = (parent, id, className) => {
  if (parent.id === id || parent.class === className) {
    return parent;
  }

  if (!parent.children.length) {
    return null;
  }

  for (let i = 0; i < parent.children.length; i++) {
    return findElement(parent.children[i], id, className);
  }
};

const findElementByKey = (node, key) => {
  console.log(key);
  // 현재 노드가 찾는 노드면 true를 return
  if (node.key === key) {
    console.log('find!');
    return true;
  }

  // 현재 노드가 찾는 노드가 아니면, childrenNode중에 있는지 찾아야함.
  node.children.forEach((child) => {
    findElementByKey(child, key);
  });
};

/* 최초 DOM, 최상단 Node. */
/* 없을 시 최초에 들어온 prevElement를 root로 이용한다. */
/* 그 이후에 부모가 추가되면 parent에 추가하고, 해당 parent를 최상단으로 올린다. */
let prevDOMNode = {};

/* class, id가 없을수도 있음 => 각 elem이 고유한 key 를 가지고 있어야 함. */
/* Key 가 생성되는 순간 => prevDOMNode에 추가 될 때 */

/* element: SunnyDomNode, prevElement?: realDomNode */
const render = (element, prevElement) => {
  const parsedPrevElement = prevElement ? Sunny.parseDomElement(prevElement) : null;

  /* 최초 이전 노드가 없을 시 추가 */
  if (!Object.keys(prevDOMNode).length && prevElement) {
    if (!parsedPrevElement.key) {
      parsedPrevElement['key'] = idGenerator.getId();

      parsedPrevElement.children = parsedPrevElement.children.map((child) => ({ ...child, key: idGenerator.getId() }));
    }

    prevDOMNode = parsedPrevElement;
  }

  /* 부모노드는 실제 DOM에서 identifier 를 반드시 하나 이상 가지고 있어햐 함.*/
  /* 일단은 쉽게, 모든 노드는 다 다른 Id 혹은 className을 가지고 있다고 가정 */

  /* 1. prevDOMNode의 하위에 해당 노드가 있는 지 찾기 */
  let targetNode = findElement(prevDOMNode, element.id, element.class);

  if (!targetNode) {
    // 일단 없으면 최상위에 가져다 꽂을것.

    element.key = idGenerator.getId();

    prevDOMNode.children.push(element);

    const selector = prevDOMNode.id ? `#${prevDOMNode.id}` : prevDOMNode.class ? `.${prevDOMNode.class}` : '';
    const $parent = document.querySelector(selector);

    $parent.innerHTML = '';

    $parent.append(createDomNode(element));

    return;
  }

  if (targetNode) {
    const changedNodes = diff(targetNode, element, []);

    /* 그리고 바뀐 부분만 돔에 그릴거야 */

    changedNodes?.forEach(({ prevNode, newNode }) => {
      const selector = prevNode.id ? `#${prevNode.id}` : prevNode.class ? `.${prevNode.class}` : prevNode.tagName;
      const $node = [...document.querySelectorAll(selector)].find(
        ($elem) => $elem.innerHTML === createDomNode(prevNode).innerHTML
      );

      $node.innerHTML = createDomNode(newNode).innerHTML;
    });

    // 여기는 실제 돔에 영향을 안줘서 탐색을 하기 보다는, 그냥 대체 할 거야.
    prevDOMNode.children = [{ ...element, key: targetNode.key }];

    return;
  }

  return;
};

export default render;
