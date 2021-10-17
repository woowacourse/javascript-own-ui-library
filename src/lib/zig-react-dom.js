import reconciliate from './reconciliate';

const ZigDom = (function () {
  let currDom;
  let domFactory;
  let root;

  const createDom = (element, container) => {
    const { type, props } = element;

    const fragment = document.createDocumentFragment();
    const initialNode = type === 'text' ? document.createTextNode('') : document.createElement(type);

    const vDom = Object.entries(props).reduce((totalNode, [key, value]) => {
      if (key !== 'children' && key !== 'marked') {
        totalNode[key] = value;
      }

      return totalNode;
    }, initialNode);

    props.children.forEach((child) => createDom(child, vDom));

    (container || fragment).appendChild(vDom);

    return container || fragment;
  };

  const _render = (element, container) => {
    const vDom = createDom(element);

    container.appendChild(vDom);
  };

  const render = (component, container) => {
    domFactory = domFactory || component;
    root = root || container;

    if (typeof domFactory !== 'function') {
      console.error('component should return function');

      return;
    }

    const vDom = domFactory();
    currDom = vDom;

    _render(vDom, root);
  };

  const rerender = () => {
    const newDom = domFactory();

    const { isEqual, markedDom } = reconciliate(currDom, newDom);

    currDom = newDom;

    // (쉬운 ver.)diff하지 않고 전부 리렌더링
    // root.innerHTML = '';
    // _render(newDom, root);

    if (!isEqual) {
      repaint(markedDom, root.firstChild);
    }
  };

  const repaint = (element, originDom) => {
    if (element.marked) {
      originDom.replaceWith(createDom(element));
    }

    element.props.children.forEach((child, idx) => {
      repaint(child, originDom.childNodes[idx]);
    });
  };

  return { render, rerender };
})();

export default ZigDom;
