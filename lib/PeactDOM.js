const prevSnapshot = { vDOM: null };

/* initial rendering 함수 */
function render(vDOM, root) {
  // parse => createElement(...)
  prevSnapshot.vDOM = vDOM;

  const fragment = document.createDocumentFragment();
  makeDOM(vDOM, fragment);
  root.appendChild(fragment);
}

/* Virtual DOM을 순회하며 element를 생성하는 함수 */
function makeDOM(vDOMObject, parent) {
  const { type, props, children } = vDOMObject;

  if (type === 'text') {
    parent.textContent = children[0];
    return;
  }

  const element = document.createElement(type);

  Object.entries(props).forEach(([key, value]) =>
    typeof value === 'function'
      ? element.addEventListener(key, value)
      : element.setAttribute(key, value)
  );

  parent.appendChild(element);

  children.forEach((child) => {
    makeDOM(child, element);
  });
}

/* re-rendering 함수 */
function reRender(newVDOM) {
  const rootElement = document.getElementById('root');
  const appComponent = rootElement.children[0];

  findDifference(prevSnapshot.vDOM, newVDOM, appComponent);

  prevSnapshot.vDOM = newVDOM;
}

/* 이전 vDOM과 새로운 vDOM의 차이를 찾아내 replace 하는 함수 */
function findDifference(prevVDOM, newVDOM, currentRealDOM) {
  const { type: prevType, props: prevProps, children: prevChildren } = prevVDOM;
  const { type: newType, props: newProps, children: newChildren } = newVDOM;

  const prevPropsKeys = Object.keys(prevProps);
  const newPropsKeys = Object.keys(newProps);
  const propsKeys =
    newPropsKeys.length > prevPropsKeys.length ? newPropsKeys : prevPropsKeys;

  // 종료 조건
  if (!newChildren.length) {
    return;
  }

  // type 비교
  if (prevType !== newType) {
    replaceElement(newVDOM, currentRealDOM);
    return;
  }

  // props 비교
  for (let i = 0; i < propsKeys.length; i++) {
    const prevProp = prevProps?.[propsKeys[i]];
    const newProp = newProps?.[propsKeys[i]];

    if (typeof prevProp === 'function' || typeof newProp === 'function') {
      if (prevProp.toString() !== newProp.toString()) {
        // eventListener가 변경됐다면
        replaceElement(newVDOM, currentRealDOM);
        return;
      }

      // eventListener가 변경되지 않았다면
      currentRealDOM.removeEventListener(propsKeys[i], prevProp);
      currentRealDOM.addEventListener(propsKeys[i], newProp);
      continue;
    }

    if (prevProp !== newProp) {
      replaceElement(newVDOM, currentRealDOM);
      return;
    }
  }

  // text node 비교 or children을 타고 재귀 호출
  newChildren.forEach((newChild, idx) => {
    if (newChild.type === 'text') {
      const [prevText] = prevChildren[idx].children;
      const [newText] = newChild.children;

      if (prevText !== newText) {
        replaceElement(newVDOM, currentRealDOM);
        return;
      }
    } else {
      findDifference(prevChildren[idx], newChild, currentRealDOM.children[idx]);
    }
  });
}

function replaceElement(content, target) {
  const fragment = document.createDocumentFragment();
  makeDOM(content, fragment);
  target.replaceWith(fragment);
}

export { render, reRender };
