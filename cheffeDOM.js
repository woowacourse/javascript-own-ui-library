import { VNode } from './cheffe.js';
import { ERROR_MESSAGE } from './constants.js';

let currentRootElement = null;
let currentRootVNode = null;
let eventList = [];

function bindEvent(node, eventType, callback) {
  node.addEventListener(eventType, callback);

  eventList = [...eventList, { node, eventType, callback }];
}

function createRealDOMNode(vNode) {
  // VNode가 아닌 값이 들어왔다면, 텍스트 노드로 생성한다.
  if (!(vNode instanceof VNode)) {
    return document.createTextNode(vNode);
  }

  const { nodeName, attributes, children } = vNode;

  const node = document.createElement(nodeName);

  // element에 속성이 있다면 지정해준다
  if (attributes) {
    // 모든 속성을 순회한다.
    Object.entries(attributes).forEach(([key, value]) => {
      const isBindEvent = key.slice(0, 2) === 'on';

      // 속성이 on으로 시작하고, value가 함수이면, 이벤트를 bind한다.
      if (isBindEvent && typeof value === 'function') {
        const eventType = key.slice(2);

        bindEvent(node, eventType, value);
      }

      // value가 문자열이면, setAttribute한다.
      else if (typeof value === 'string') {
        node.setAttribute(key, value);
      }
    });
  }

  const childNodes = children.map((child) => createRealDOMNode(child));

  node.append(...childNodes);

  // 구성된 Real DOM Node를 반환한다.
  return node;
}

function updateRealDOMNode(vNode, targetNode) {
  const fragment = document.createDocumentFragment();
  const node = createRealDOMNode(vNode);
  fragment.appendChild(node);

  targetNode.parentNode.replaceChild(fragment, targetNode);
  console.log('DOM 업데이트됨');
}

// Real DOM Node와 VNode와의 변경 사항을 체크한다.
// 루트 노드부터 시작해 상위 노드를 순서대로 쭉 비교한다.
// 상위 노드가 변경되었으면, 하위 노드들도 변경된 상태로 간주한다.
function diff(node, vNode) {
  // node가 텍스트 노드일 때, vNode가 VNode가 아닌 다른 타입이라면
  if (node instanceof Text && !(vNode instanceof VNode)) {
    // node 문자열과 vNode 문자열이 같지 않다면 텍스트 노드가 다르다고 판단한다.
    if (node.data !== `${vNode}`) {
      console.log('텍스트 노드 다름', node.data, `${vNode}`);

      // 바뀐 노드에만 DOM을 업데이트한다.
      updateRealDOMNode(vNode, node);
      return;
    }
  }

  // TODO: node.childNodes와 vNode.children의 길이가 다를 때, 참조 에러 막기
  for (let i = 0; i < node.childNodes.length; i++) {
    const currentNode = node.childNodes[i];
    const currentVNode = vNode.children[i];

    if (
      currentNode.nodeName.toLowerCase() !== currentVNode.nodeName.toLowerCase()
    ) {
      console.log(
        '노드 이름 다름',
        currentNode.nodeName,
        currentVNode.nodeName
      );

      updateRealDOMNode(currentVNode, currentNode);
      continue;
    }

    // TODO: currentNode.attributes와 Object.keys(currentVNode.attributes)의 길이가 다를 때, 참조 에러 막기
    for (let j = 0; j < currentNode.attributes.length; j++) {
      const { name, value } = currentNode.attributes[j];

      if (!currentVNode.attributes[name]) {
        console.log('해당 속성 없음', currentAttribute[name]);

        updateRealDOMNode(currentVNode, currentNode);
        continue;
      }

      if (value !== currentVNode.attributes[name]) {
        console.log('속성 다름', value, currentVNode.attributes[name]);

        updateRealDOMNode(currentVNode, currentNode);
        continue;
      }
    }

    // TODO: currentNode.childNodes와 Object.keys(currentVNode.children)의 길이가 다를 때, 참조 에러 막기
    for (let j = 0; j < currentNode.childNodes.length; j++) {
      const currentNodeChild = currentNode.childNodes[j];
      const currentVNodeChild = currentVNode.children[j];

      diff(currentNodeChild, currentVNodeChild);
    }
  }
}

function update(vNode) {
  if (typeof vNode !== 'object') {
    throw new Error(ERROR_MESSAGE.RENDER.INVALID_VNODE);
  }

  diff(currentRootElement.firstChild, vNode);

  currentRootVNode = vNode;
}

function render(vElement, rootElement) {
  const vNode = vElement();

  if (currentRootVNode) {
    throw new Error(ERROR_MESSAGE.RENDER.ONLY_CALL_ONCE);
  }

  if (typeof vNode !== 'object') {
    throw new Error(ERROR_MESSAGE.RENDER.INVALID_VNODE);
  }

  if (!rootElement) {
    throw new Error(ERROR_MESSAGE.RENDER.EMPTY_ROOT_ELEMENT);
  }

  currentRootElement = rootElement;
  currentRootVNode = vNode;

  const fragment = document.createDocumentFragment();
  const node = createRealDOMNode(currentRootVNode);

  fragment.appendChild(node);
  rootElement.appendChild(fragment);
}

const CheffeDOM = {
  render,
  update,
};

export default CheffeDOM;
