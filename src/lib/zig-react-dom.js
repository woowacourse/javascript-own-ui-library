import reconciliate from './reconciliate';

const ZigDom = (function () {
  const _render = (element, container) => {
    const { type, props } = element;

    const initialNode = type === 'text' ? document.createTextNode('') : document.createElement(type);

    const vDom = Object.entries(props).reduce((totalNode, [key, value]) => {
      if (key !== 'children') {
        totalNode[key] = value;
      }

      return totalNode;
    }, initialNode);

    props.children.forEach((child) => _render(child, vDom));

    container.appendChild(vDom);
  };

  let currDom;
  let node;
  let root;

  const render = (component, container) => {
    node = node || component;
    root = root || container;

    if (typeof node !== 'function') {
      console.error('component should return function');

      return;
    }

    const vDom = node();
    currDom = vDom;

    _render(vDom, root);
  };

  const rerender = () => {
    const newDom = node();

    reconciliate(currDom, newDom);

    root.innerHTML = '';

    render();

    currDom = newDom;
  };

  return { render, rerender };
})();

export default ZigDom;
