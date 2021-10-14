function createElement(nodeName, attributes, children) {
  return {
    nodeName,
    attributes,
    children,
  };
}

const Cheffe = {
  createElement,
};

export default Cheffe;
