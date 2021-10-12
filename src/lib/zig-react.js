const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return createTextElement(child);
        } else {
          return child;
        }
      }),
    },
  };
};

const createTextElement = (textValue) => {
  return createElement('text', { nodeValue: textValue });
};

const useState = (initialValue) => {
  let _value = initialValue;

  const state = _value;

  const setState = (newValue) => {
    _value = newValue;
  };

  return [state, setState];
};

const Zig = {
  createElement,
  useState,
};

export default Zig;
