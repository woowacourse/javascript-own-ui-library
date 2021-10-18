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

  prevSnapshot.vDOM = newVDOM;

  rootElement.innerHTML = '';
  render(newVDOM, rootElement);
}

export { render, reRender };
