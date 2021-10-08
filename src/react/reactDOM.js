const render = (vNode, container) => {
  const {
    type,
    props: { children, ...attrs },
  } = vNode;

  const node = Object.entries(attrs).reduce(
    (node, [key, value]) => {
      node[key] = value;

      return node;
    },
    type === 'TEXT_NODE'
      ? document.createTextNode('')
      : document.createElement(type)
  );

  if (!children) {
  } else if (Array.isArray(children)) {
    children.forEach(child => render(child, node));
  } else if (typeof children === 'object') {
    render(children, node);
  } else {
    throw new Error('Invalid children type.');
  }

  container.append(node);

  return node;
};

export default {
  render,
};
