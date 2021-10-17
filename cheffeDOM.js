import { ERROR_MESSAGE } from './constants.js';

let currentRootElement = null;
let currentRootVNode = null;
let eventList = [];

function bindEvent(node, eventType, callback) {
  node.addEventListener(eventType, callback);

  eventList = [...eventList, { node, eventType, callback }];
}

function createRealDOMNode({ nodeName, attributes, children }) {
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

  // children에 다른 요소가 있다면 (Array일 경우) Real DOM Node로 만들어 현재 node에 append한다.
  if (Array.isArray(children)) {
    const childNodes = children.map((child) => createRealDOMNode(child));

    node.append(...childNodes);
  }

  // children이 배열이 아니라면 textNode로 만들어 현재 node에 appendChild한다.
  else {
    const textNode = document.createTextNode(children);

    node.appendChild(textNode);
  }

  // 구성된 Real DOM Node를 반환한다.
  return node;
}

function diff(newVNode, oldVNode) {}

function update(vNode) {
  if (typeof vNode !== 'object') {
    throw new Error(ERROR_MESSAGE.RENDER.INVALID_VNODE);
  }

  const { nodeName, attributes, children } = vNode;

  const node = createRealDOMNode({ nodeName, attributes, children });
  diff(vNode, currentRootVNode);

  const fragment = document.createDocumentFragment();
  fragment.appendChild(node);

  currentRootVNode = vNode;
  currentRootElement.replaceChild(fragment, currentRootElement.firstChild);
}

function render(vNode, rootElement) {
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

  const { nodeName, attributes, children } = currentRootVNode;

  const fragment = document.createDocumentFragment();
  const node = createRealDOMNode({ nodeName, attributes, children });

  fragment.appendChild(node);
  rootElement.appendChild(fragment);
}

const CheffeDOM = {
  render,
  update,
};

export default CheffeDOM;
