function createElement(type, props, ...children) {
  return {
    type,
    props,
    children: children.map((child) =>
      typeof child === 'function' ? child() : child
    ),
  };
}

export { createElement };
