const createElement = (node, parent) => {
  const { tagName, attributes, children, value } = node;
  const isTextNode = !!value;

  if (isTextNode) {
    const $elem = document.createTextNode(value);

    parent.append($elem);
    return;
  }

  const $elem = document.createElement(tagName);

  parent.append($elem);
  attributes.forEach(([key, value]) => $elem.setAttribute(key, value));
  children.forEach((child) => createElement(child, $elem));
};

export const render = (virtualDOM, root) => {
  const rootFragment = new DocumentFragment();

  virtualDOM.children.map((node) => createElement(node, rootFragment));

  root.innerHTML = '';
  root.append(rootFragment);
};
