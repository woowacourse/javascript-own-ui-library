import ZigDom from './zig-react-dom';

const Zig = (function () {
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

  let hooks = [];
  let idx = 0;

  const useState = (initialValue) => {
    const _idx = idx;
    hooks[_idx] = initialValue;

    const getState = () => hooks[_idx] || initialValue;

    const state = {
      value: getState,
    };

    const setState = (newValue) => {
      hooks[_idx] = newValue;

      ZigDom.rerender();
    };

    idx++;

    return [state, setState];
  };

  return { createElement, useState };
})();

export default Zig;
