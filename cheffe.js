const createElement = (() => {
  let nextId = -1;

  return (nodeName, attributes, children) => {
    nextId += 1;

    return {
      key: nextId,
      nodeName,
      attributes,
      children,
    };
  };
})();

const Cheffe = {
  createElement,
};

export default Cheffe;
