export const isEventProp = (prop) => {
  return prop.startsWith('on');
};

export const isPlainText = (value) => typeof value === 'string' || typeof value === 'number';

export const isTextNode = (node) => node instanceof Text;

const isAttributeChange = (oldNode, newNode) => {
  // 1. props 비교하기
  const oldAttributes = oldNode.attributes; // { 0: style, 1: class, 2:className }
  const newAttributes = newNode.attributes;

  // props의 개수가 다를 경우 => 변경되었군
  if (oldAttributes.length !== newAttributes.length) {
    return true;
  }

  // props 개수가 동일할 때, => 각 어트리뷰트의 실제 값을 불러와 비교하기
  for (let i = 0; i < oldAttributes.length; i++) {
    const oldAttr = oldAttributes[i].name;
    const newAttr = newAttributes[i].name;

    if (
      oldNode.getAttribute(oldAttr) !== newNode.getAttribute(oldAttr) ||
      newNode.getAttribute(newAttr) !== oldNode.getAttribute(newAttr)
    ) {
      return true;
    }
  }

  // 2. textContent 비교하기
  const oldFirstChild = oldNode.firstChild;
  const newFirstChild = newNode.firstChild;

  if (isTextNode(oldFirstChild) && isTextNode(newFirstChild)) {
    if (oldFirstChild.textContent !== newFirstChild.textContent) {
      return true;
    }
  }

  return false;
};

export const diff = ($parent, oldNode, newNode) => {
  // CASE1 아무것도 없다면 끝
  if (oldNode === null && newNode === null) {
    return;
  }

  // CASE2 이전 노드가 없는 상태에서 새로운 노드가 생겼다면 추가하기
  if (oldNode === null && newNode !== null) {
    $parent.append(newNode);
    return;
  }

  // CASE3 이전 노드는 있는데, 새로운 노드는 없다면 비우기
  if (oldNode !== null && newNode === null) {
    $parent.innerHTML = '';
    return;
  }

  // CASE4: 노드 타입 비교하기
  if (oldNode.nodeName !== newNode.nodeName) {
    oldNode.replaceWith(newNode);
    return;
  }

  // CASE5: 노드들 간의 attribute 비교
  if (isAttributeChange(oldNode, newNode)) {
    oldNode.replaceWith(newNode);
    return;
  }

  // CASE6: children 비교
  // text 노드를 가져오기 위해서 children대신 childNodes 사용
  const oldChildNodes = Array.from(oldNode.children);
  const newChildNodes = Array.from(newNode.children);

  const length = Math.max(oldChildNodes.length, newChildNodes.length);

  // 기존 노드를 기준으로 자식 노드 비교하기 (by 재귀)
  for (let i = 0; i < length; i++) {
    diff(oldNode, oldChildNodes[i], newChildNodes[i]);
  }
};

export const delay = (ms = 3000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
