function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === 'string' ? createTextElement(child) : child)),
    },
  };
}

function createTextElement(textValue) {
  return createElement('text', { nodeValue: textValue });
}

function useState(initialValue) {
  let _value = initialValue;

  const state = _value;

  const setState = (newValue) => {
    _value = newValue;
  };

  return [state, setState];
}

const React = {
  createElement,
  useState,
};

export default React;
