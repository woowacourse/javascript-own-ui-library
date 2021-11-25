import Counter from '../src/Counter.js';

export const html = (type, props, children) => {
  return {
    type,
    props,
    children,
  };
};

const primitiveType = ['string', 'number'];

export const createElement = node => {
  if (primitiveType.includes(typeof node)) {
    const element = document.createTextNode(node);
    element._vnode = node;

    return element;
  }

  const { type, props, children } = node;

  const element = document.createElement(type);
  element._vnode = node;

  for (const prop in props) {
    switch (prop) {
      case 'onClick':
        element.addEventListener('click', props[prop]);
        break;

      default:
        element[prop] = props[prop];
    }
  }

  for (const child of children) {
    element.appendChild(createElement(child));
  }

  return element;
};

export const diff = (el, newVNode, oldVNode) => {
  // 1. 바뀐 노드에서 없어졌을때
  if (!newVNode && newVNode !== '' && newVNode !== 0) return el.remove();

  // 2. 값이 string, number 인데, 그 text 내용이 바뀌었을때

  if (
    primitiveType.includes(typeof newVNode) ||
    primitiveType.includes(typeof oldVNode)
  ) {
    if (oldVNode !== newVNode) {
      const element = el.replaceWith(createElement(newVNode));

      return element;
    }
  } else {
    // 3. 현재 태그명이 바뀌었을때
    if (oldVNode?.type !== newVNode?.type) {
      return el.replaceWith(createElement(newVNode));
    }

    // 4. props에 변화가 있을때 (제거되었으면 제거, 추가되었으면 추가)
    for (const prop in { ...oldVNode.props, ...newVNode.props }) {
      if (newVNode.props[prop] === undefined) {
        delete el[prop];
      } else if (
        oldVNode.props[prop] === undefined ||
        oldVNode.props[prop] !== newVNode.props[prop]
      ) {
        el[prop] = newVNode.props[prop];
      }
    }

    // 5. children vnode에 대해 재귀적 수행
    for (let i = 0; i < newVNode.children?.length; i++) {
      diff(el.childNodes[i], newVNode.children[i], oldVNode.children[i]);
    }

    // 6. 자식 노드가 추가되었을때
    for (
      let i = oldVNode.children?.length ?? 0;
      i < newVNode.children?.length ?? 0;
      i++
    ) {
      el.appendChild(createElement(newVNode.children[i]));
    }
  }
};

// ==== 상태 관리 ====

export const useState = defaultState => {
  return new Proxy(defaultState, {
    get: function (target, prop) {
      return target[prop];
    },
    set: function (target, prop, value) {
      target[prop] = value;

      diff(
        document.querySelector('#root').children[0],
        Counter()._vnode, // new
        document.querySelector('#root').children[0]._vnode // old
      );

      return true;
    },
  });
};
