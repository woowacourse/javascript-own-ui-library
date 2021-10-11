function _render(element, container) {
  const { type, props } = element;
  const initialNode = type === 'text' ? document.createTextNode('') : document.createElement(type);

  const vDom = Object.entries(props).reduce((totalNode, [key, value]) => {
    if (key !== 'children') {
      totalNode[key] = value; // text일 때는 key === nodeValue
    }

    return totalNode;
  }, initialNode);

  // REFACTOR: ts interface로 수정 (함수 바디 상단부에서)
  props.children.forEach((child) => {
    if (typeof child === 'object') {
      _render(child, vDom);
    } else {
      // {} 형태의 template tag로 들어오는 경우
      const textNode = document.createTextNode(child);
      vDom.appendChild(textNode);
    }
  });
  container.appendChild(vDom);
}

function render(component, container) {
  if (typeof component !== 'function') {
    console.error('component type should be function');

    return;
  }

  const { type, props } = component();

  _render({ type, props }, container);
}

const ReactDOM = {
  render,
};

export default ReactDOM;
