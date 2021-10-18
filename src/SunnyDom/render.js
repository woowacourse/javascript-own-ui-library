import Sunny, { findElement } from '../Sunny/index.js';
import createDomNode from './createDomNode.js';
import diff from './diff.js';
import findDomNode from './findDomNode.js';

import { isEmptyObject } from '../utils/objectUtils.js';

/* 최초 DOM, 최상단 Node. */
/* 없을 시 최초에 들어온 prevElement를 root로 이용한다. */
/* 그 이후에 부모가 추가되면 parent에 추가하고, 해당 parent를 최상단으로 올린다. */
let prevDOMNode = {};

/* element: SunnyDomNode, prevElement?: realDomNode */
const render = (element, prevElement) => {
  const parsedPrevElement = prevElement ? Sunny.parseDomElement(prevElement) : null;

  if (isEmptyObject(prevDOMNode) && prevElement) {
    prevDOMNode = parsedPrevElement;
  }

  const targetNode = findElement(prevDOMNode, { ...element, className: element.class });

  if (targetNode) {
    /* 변경된 노드 목록 */
    const changedNodes = diff(targetNode, element, []);

    /* 바뀐 부분만 돔에 그리기 */

    changedNodes?.forEach(({ prevNode, newNode }) => {
      const $node = findDomNode(prevNode);

      $node.innerHTML = createDomNode(newNode).innerHTML;
    });

    // 여기는 실제 돔에 영향을 안줘서 탐색을 하기 보다는, 대체.
    prevDOMNode.children = [{ ...element }];

    return;
  }

  /* target Node를 기존 노드에서 찾을 수 있는가? */
  /* 있다면, parents 확인 & 부모 노드를 기준으로 render */

  if (element.parent) {
    return render(element.parent);
  }

  /* parent 가 없으면, 최 상단에 추가하는 것으로 정의 */

  const $parent = findDomNode(prevDOMNode);
  $parent.appendChild(createDomNode(element));

  prevDOMNode.children.push(element);
};

export default render;
