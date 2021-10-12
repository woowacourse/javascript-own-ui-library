const _render = (element, container) => {
  const { type, props } = element;

  const initialNode = type === 'text' ? document.createTextNode('') : document.createElement(type);

  const vDom = Object.entries(props).reduce((totalNode, [key, value]) => {
    if (key !== 'children') {
      totalNode[key] = value; // text일 때는 key === nodeValue
    }

    return totalNode;
  }, initialNode);

  props.children.forEach((child) => _render(child, vDom));

  container.appendChild(vDom);
};

const render = (component, container) => {
  if (typeof component !== 'function') {
    console.error('component type should be function');

    return;
  }

  const { type, props } = component();

  _render({ type, props }, container);
};

const ReactDOM = {
  render,
};

export default ReactDOM;
