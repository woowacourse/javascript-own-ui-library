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

const diff = (prevNode, newNode, changedNodes) => {
  const $prevNode = createDomNode(prevNode);
  const $newNode = createDomNode(newNode);

  // 동일하면 더이상 비교할 필요가 없음.
  if ($prevNode.innerHTML === $newNode.innerHTML) {
    return changedNodes;
  }

  // 동일하지 않으면 자식 비교 해야함.

  // 만약 자식 개수가 다르면, 내용이 아예 달라졌다고 가정할 수 있음.
  // 그러므로 children의 수가 달라졌을 땐 내가 갈아끼워 지면 됨.
  // 더이상 탐색 x 자기 자신을 넣고 종료.

  if (prevNode.children.length !== newNode.children.length) {
    return [...changedNodes, { prevNode, newNode }];
  }

  // 만약 자식이 없다면, 본인의 내용이 다른 것이므로 자기 자신을 넣고 종료.
  if (!prevNode.children.length || !newNode.children.length) {
    return [...changedNodes, { prevNode, newNode }];
  }

  // 만약 자식 개수가 같으면, 순서대로 비교할 수 있음.
  // 순서가 다른 건 따로 비교하지 않고, 같은 노드라도 배치가 다르면 아예 달라진 것으로 봄
  // 각 노드에 자식이 있는 경우 재귀적으로 비교.

  const changedNodesOfChildren = [];
  // forEach 등은 반환값을 줄 수 없기 때문에 for 문으로 자식을 재귀적으로 탐색
  for (let i = 0; i < newNode.children.length; i++) {
    changedNodesOfChildren.push(...diff(prevNode.children[i], newNode.children[i], changedNodes));
  }

  return [...changedNodes, ...changedNodesOfChildren];
};

export default diff;
