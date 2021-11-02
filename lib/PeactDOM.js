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
  const appComponent = rootElement.firstChild;

  updateDifference(prevSnapshot.vDOM, newVDOM, appComponent);

  prevSnapshot.vDOM = newVDOM;
}

/* 이전 vDOM과 새로운 vDOM의 차이를 찾아내 replace 하는 함수 */
function updateDifference(prevVDOM, newVDOM, currentRealDOM) {
  const { type: prevType, props: prevProps, children: prevChildren } = prevVDOM;
  const { type: newType, props: newProps, children: newChildren } = newVDOM;

  const prevPropsKeys = Object.keys(prevProps);
  const newPropsKeys = Object.keys(newProps);
  const propsKeys =
    newPropsKeys.length > prevPropsKeys.length ? newPropsKeys : prevPropsKeys;

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
      if (prevProp?.toString() !== newProp?.toString()) {
        // eventListener가 변경됐다면 (제거되거나 새로 생기는 경우도 고려)
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

  // 종료 조건
  if (!newChildren.length) {
    return;
  }

  // text node 비교 or children을 타고 재귀 호출
  for (let i = 0; i < newChildren.length; i++) {
    const nextPrevChild = prevChildren[i];
    const nextNewChild = newChildren[i];

    if (nextNewChild.type === 'text') {
      const [prevText] = nextPrevChild.children;
      const [newText] = nextNewChild.children;

      if (prevText !== newText) {
        replaceElement(newVDOM, currentRealDOM);
        return;
      }
    } else {
      if (!nextPrevChild || !nextNewChild) return;

      updateDifference(nextPrevChild, nextNewChild, currentRealDOM.children[i]);
    }
  }
}

function replaceElement(content, target) {
  const fragment = document.createDocumentFragment();
  makeDOM(content, fragment);
  target.replaceWith(fragment);
}

export { render, reRender };
