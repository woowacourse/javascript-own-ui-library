import { isEventProp, isPlainText, diff } from './utils.js';

// vNode를 받아서 실제 DOM Node로 변환하는 함수
const vNodeToNode = (vNode) => {
  const { type, props } = vNode;

  const $node = typeof type === 'string' ? document.createElement(type) : vNodeToNode(type(props));

  const { children, ...rest } = props;

  // 해당 DOM 요소에 props 추가하기
  Object.entries(rest).forEach(([key, value]) => {
    // html attributes
    if (key in $node) {
      $node[key] = value;
    }

    // event
    else if (isEventProp(key)) {
      const eventName = key.replace('on', '').toLowerCase();
      $node.addEventListener(eventName, value);
    }

    // etc prop
    else {
      $node.setAttribute(`data-prop-${key}`, value);
    }
  });

  // 자식 요소에 대해서 재귀적으로 DOM Node로 변환하여 부모 요소에 추가
  children.forEach((child) => {
    const $child = isPlainText(child) ? document.createTextNode(child) : vNodeToNode(child);

    $node.append($child);
  });

  return $node;
};

let oldNode = null;
let newNode = null;

const render = (Component, $element) => {
  oldNode = $element.firstChild;
  newNode = vNodeToNode(Component);

  diff($element, oldNode, newNode);
};

export default {
  render,
};
