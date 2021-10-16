const prevSnapshot = { component: null };

function render(component, root) {
  // parse => createElement(...)
  prevSnapshot.component = component;
  const vDOM = component();
  // diff
  const fragment = document.createDocumentFragment();
  makeDOM(vDOM, fragment);
  root.appendChild(fragment);
}

function makeDOM(vDOMObject, parent) {
  // console.log(vDOMObject);

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

function reRender() {
  const rootElement = document.getElementById('root');
  // 현재는 root를 싹 비워주고, 전부 다시 그려주고 있음. (diff 없음)
  rootElement.innerHTML = '';
  render(prevSnapshot.component, rootElement);
}

export { render, reRender };
