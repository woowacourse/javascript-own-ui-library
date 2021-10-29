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
      const isEventHandler = key.slice(0, 2) === 'on';
      const validValueTypes = ['string', 'boolean', 'number'];

      // 속성이 on으로 시작하고, value가 함수이면, 이벤트를 bind한다.
      if (isEventHandler && typeof value === 'function') {
        const eventType = key.slice(2);

        bindEvent(node, eventType, value);
      }

      // value가 유효하면, setAttribute한다.
      else if (validValueTypes.includes(typeof value)) {
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
// 현재 노드의 nodeName, attributes들을 순서대로 쭉 비교한다.
// 현재 노드가 변경되었으면, 하위 노드들도 변경된 상태로 간주하고 vNode의 내용을 DOM에 새로 업데이트한다.
// 변경된 노드가 없으면 하위 노드들도 하나씩 재귀적으로 diff를 실행한다.
function diff(node, vNode) {
  if (node instanceof Text && !(vNode instanceof VNode)) {
    // node 문자열과 vNode 문자열이 같지 않다면 텍스트가 다르다고 판단하고 DOM을 업데이트한다.
    if (node.data !== `${vNode}`) {
      console.log('텍스트 노드 다름', node.data, `${vNode}`);

      updateRealDOMNode(vNode, node);
    }

    return;
  }

  if (node.nodeName.toLowerCase() !== vNode.nodeName.toLowerCase()) {
    console.log('노드 이름 다름', node.nodeName, vNode.nodeName);

    updateRealDOMNode(vNode, node);

    return;
  }

  for (let i = 0; i < node.attributes.length; i++) {
    const { name, value } = node.attributes[i];

    if (!vNode.attributes[name]) {
      console.log('해당 속성 없음', currentAttribute[name]);

      updateRealDOMNode(vNode, node);

      return;
    }

    if (value !== vNode.attributes[name]) {
      console.log('속성 다름', value, vNode.attributes[name]);

      updateRealDOMNode(vNode, node);

      return;
    }
  }

  const childrenLength = Math.max(
    node.childNodes?.length ?? 0,
    vNode.children?.length ?? 0
  );

  for (let i = 0; i < childrenLength; i++) {
    // 업데이트할 버추얼 돔보다 리얼 돔이 자식 노드를 더 가지고 있다면, 리얼돔에서 삭제되어야 한다.
    if (i >= vNode.children.length) {
      for (let j = 0; j < eventList.length; j++) {
        // 삭제될 노드에 걸려 있는 이벤트가 있다면, 해당 이벤트 리스너를 해제한다.
        if (eventList[j]?.node === node.childNodes[i]) {
          document.removeEventListener(
            eventList[j].eventType,
            eventList[j].callback
          );
          eventList.splice(j, 1);
        }
      }

      node.childNodes[i].remove();

      continue;
    }

    // 반대로 리얼돔에는 없지만 새로 생성되어야 할 노드들이 있다면 렌더한다.
    if (i >= node.childNodes.length) {
      const newNode = createRealDOMNode(vNode.children[i]);
      node.appendChild(newNode);

      continue;
    }

    diff(node.childNodes[i], vNode.children[i]);
  }
}

function update(vNode) {
  if (!(vNode instanceof VNode)) {
    throw new Error(ERROR_MESSAGE.RENDER.INVALID_VNODE);
  }

  diff(currentRootElement.firstChild, vNode);

  currentRootVNode = vNode;
}

function render(vElement, rootElement) {
  const vNode = vElement;

  if (currentRootVNode) {
    throw new Error(ERROR_MESSAGE.RENDER.ONLY_CALL_ONCE);
  }

  if (!(vNode instanceof VNode)) {
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
