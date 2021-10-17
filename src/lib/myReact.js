const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: [...children],
    },
  };
};

export default {
  createElement,
};
