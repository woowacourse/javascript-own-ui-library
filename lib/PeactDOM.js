const prevSnapshot = { vDOM: null };
const differences = [];

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
    parent.innerHTML = children[0];
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

  // findDifference(prevSnapshot.vDOM, newVDOM, rootElement);
  prevSnapshot.vDOM = newVDOM;

  if (!differences.length) {
    rootElement.innerHTML = '';
    render(newVDOM, rootElement);
    return;
  }
}

/* 이전 vDOM과 새로운 vDOM의 차이를 찾아내는 함수(미완성) */
// function findDifference(prevVDOM, newVDOM, parent) {
//   console.log(parent);
//   const { type, props, children } = prevVDOM;
//   const { type: newType, props: newProps, children: newChildren } = newVDOM;

//   const prevPropsKeys = Object.keys(props);
//   const newPropsKeys = Object.keys(newProps);
//   const propsKeys =
//     newPropsKeys.length > prevPropsKeys.length ? newPropsKeys : prevPropsKeys;

//   if (!children.length) {
//     return;
//   }

//   const currentElement = document.createElement(newVDOM.type);
//   Object.entries(newVDOM.props).forEach(([key, value]) =>
//     typeof value === 'function'
//       ? currentElement.addEventListener(key, value)
//       : currentElement.setAttribute(key, value)
//   );

//   if (type !== newType) {
//     differences.push(newVDOM);

//     parent.innerHTML = '';
//     const fragment = document.createDocumentFragment();
//     makeDOM(newVDOM, fragment);
//     parent.appendChild(fragment);
//     return;
//   }

//   for (let i = 0; i < propsKeys.length; i++) {
//     const prevProp = props?.[propsKeys[i]];
//     const newProp = newProps?.[propsKeys[i]];

//     if (typeof prevProp === 'function' || typeof newProp === 'function') {
//       if (prevProp.toString() !== newProp.toString()) {
//         differences.push(newVDOM);

//         parent.innerHTML = '';
//         const fragment = document.createDocumentFragment();
//         makeDOM(newVDOM, fragment);
//         parent.appendChild(fragment);
//         return;
//       }
//       continue;
//     }

//     if (prevProp !== newProp) {
//       differences.push(newVDOM);

//       parent.innerHTML = '';
//       const fragment = document.createDocumentFragment();
//       makeDOM(newVDOM, fragment);
//       parent.appendChild(fragment);
//       return;
//     }
//   }

//   newChildren.forEach((child, idx) => {
//     if (child.type === 'text') {
//       const [prevText] = children[idx].children;
//       const [newText] = child.children;

//       if (prevText !== newText) {
//         differences.push(newVDOM);

//         parent.innerHTML = '';
//         const fragment = document.createDocumentFragment();
//         console.log('child');
//         makeDOM(child, fragment);
//         parent.appendChild(fragment);
//         console.log('done');
//       }
//     } else {
//       findDifference(children[idx], child, currentElement);
//     }
//   });
// }

export { render, reRender };
