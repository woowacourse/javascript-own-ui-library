const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: [...children],
    },
  };
};

const createHook = (callback) => {
  const hooks = [];
  let index = -1;

  const useState = (initialValue) => {
    index += 1;
    hooks[index] = hooks[index] ?? initialValue;

    const setState = (updater) => {
      hooks[index] = updater(hooks[index]);

      index = -1;
      callback();
    };

    return [hooks[index], setState];
  };

  return {
    useState,
  };
};

export default {
  createElement,
  createHook,
};
