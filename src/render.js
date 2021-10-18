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
  console.log(prevDOMNode);

  const parsedPrevElement = prevElement ? Sunny.parseDomElement(prevElement) : null;

  /* 최초 이전 노드가 없을 시 추가 */
  if (!Object.keys(prevDOMNode).length && prevElement) {
    if (!parsedPrevElement.key) {
      parsedPrevElement['key'] = idGenerator.getId();

      parsedPrevElement.children = parsedPrevElement.children.map((child) => ({ ...child, key: idGenerator.getId() }));
    }

    prevDOMNode = parsedPrevElement;

    console.log(prevDOMNode);
  }

  /* 부모노드는 실제 DOM에서 identifier 를 반드시 하나 이상 가지고 있어햐 함.*/
  /* 일단은 쉽게, 모든 노드는 다 다른 Id 혹은 className을 가지고 있다고 가정 */

  /* 1. prevDOMNode의 하위에 해당 노드가 있는 지 찾기 */
  let targetNode = findElement(prevDOMNode, element.id, element.class);

  console.log(targetNode);

  if (!targetNode) {
    console.log('해당 노드 돔에 없어요');
    console.log('그러니까 넣어줄거야.');

    // 일단 없으면 최상위에 가져다 꽂을것.

    element.key = idGenerator.getId();

    console.log('나 키 이거 : ' + element.key);

    prevDOMNode.children.push(element);

    console.log('가상돔에 넣었다?');

    console.log(prevDOMNode);

    console.log('그리고 돔에 넣을거야');

    const selector = prevDOMNode.id ? `#${prevDOMNode.id}` : prevDOMNode.class ? `.${prevDOMNode.class}` : '';
    const $parent = document.querySelector(selector);

    $parent.innerHTML = '';

    $parent.append(createDomNode(element));

    return;
  }

  if (targetNode) {
    console.log('오 돔에 있네?');

    console.log('targetNode : ', targetNode);
    console.log('element : ', element);

    console.log('그럼 해당 노드랑, 새로 들어온 엘리먼트에서 뭐가 달라졌는지 볼까?');

    /* 여기서는 textContent만 확인할거야 */

    console.log('먼저 내 자신부터 볼까?');

    const changedNodes = [];

    const isChanged = (() => {
      if (createDomNode(targetNode).innerHTML !== createDomNode(element).innerHTML) {
        // 왜 달라졌어?

        console.log('자식이 달라졌니?');

        targetNode.children.forEach((child, index) => {
          if (String(child.textContent) !== String(element.children[index].textContent)) {
            console.log(child.textContent, element.children[index].textContent);

            changedNodes.push(element.children[index]);
          }
        });

        console.log(changedNodes.length && '자식이 달라졌나봐!');
        if (changedNodes.length) {
          return true;
        }

        /* 자식이 아니면 내가 달라진거네! */
        if (!changedNodes.length) {
          console.log('자식이 아니면 내가 달라진거네!');
          changedNodes.push(element);

          return true;
        }
      }

      /* 자식은? */

      console.log(changedNodes);

      targetNode.children.forEach((child, index) => {
        if (child.textContent !== element.children[index].textContent) {
          changedNodes.push(element.children[index]);
        }
      });

      if (changedNodes.length) {
        return true;
      }

      return false;
    })();

    console.log('달라졌니?', isChanged);
    console.log('누가 달라졌어?, ', changedNodes);

    /* 오 얘가 달라졌구나 */

    /* 그리고 바뀐 부분만 돔에 그릴거야 */

    changedNodes.forEach((child, index) => {
      console.log(child.textContent);

      const selector = child.id ? `#${child.id}` : child.class ? `.${child.class}` : '';
      const $node = document.querySelector(selector);

      $node.innerHTML = createDomNode(child).innerHTML;
    });

    /* 그럼 이전 prevNode를 업데이트 해주자! */

    prevDOMNode.children = [{ ...element, key: targetNode.key }];

    return;
  }

  console.log('나 아무것도 아냐');

  return;
  /* elem이 기존 Node에 존재하면 === key가 있으면 using Key, 재귀*/
  if (element.key) {
    const isExistInPrevDOMNode = findElementByKey(prevDOMNode, element.key);
  }

  /* key 가 없으면 가상 돔에 등록된적 없음 */
  /* 그럼 내 노드의 최상단이 어디인지 확인해야함. */
  /* 부모 노드가 없을 때까지 key 가 있는지 없는지 확인. */
  let parentNodeInVDom = null;
  let currentElem = element;

  while (!parentNodeInVDom) {
    if (!currentElem.parent) {
      break;
    }

    if (currentElem.parent.key) {
      parentNodeInVDom = currentElem.parent;
      break;
    }

    currentElem = currentElem.parent;
  }

  if (parentNodeInVDom) {
    /* id 나 class가 있는 경우 */
    const selector = parentNodeInVDom.id
      ? `#${parentNodeInVDom.id}`
      : parentNodeInVDom.class
      ? `.${parentNodeInVDom.class}`
      : '';

    console.log(selector);

    const $parent = document.querySelector(selector);

    element.key = idGenerator.getId();

    $parent.innerHTML = '';
    $parent.append(createDomNode(element));

    return;
  }

  const current = createDomNode(element);

  const $currentNode = document.querySelector(`.${element.class}`);

  // 기존에 존재하지 않던 노드 이므로, 부모가 있으면 부모에 append
  // 없으면 root에 append
  if (!$currentNode) {
    const $parentNode = document.querySelector(`.${element.parent?.class}`) || document.querySelector('#root');

    $parentNode.append(current);

    return;
  }

  $currentNode.innerHTML = '';

  element.children.forEach((child) => {
    $currentNode.append(createDomNode(child));
  });
};

export default render;
