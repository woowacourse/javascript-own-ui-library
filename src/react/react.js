const createTextNode = value => {
  return {
    type: 'TEXT_NODE',
    props: {
      nodeValue: value,
    },
  };
};

const createElement = (type, props, ...children) => {
  if (children.length === 0)
    return {
      type,
      props,
    };

  const childNodes = children.map(child =>
    typeof child === 'string' || typeof child === 'number'
      ? createTextNode(child)
      : child
  );

  return {
    type,
    props: {
      ...props,
      children: childNodes.length === 1 ? childNodes[0] : childNodes,
    },
  };
};

export default {
  createElement,
  createTextNode,
};
