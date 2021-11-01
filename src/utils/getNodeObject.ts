const getNodeObject = (node: Element, obj = {}) => {
  if (node.hasChildNodes()) {
    obj[node.getAttribute("key")] = node;

    [...node.children].forEach((child) => {
      getNodeObject(child, obj[node.getAttribute("key")]);
    });
  } else {
    obj[node.getAttribute("key")] = node;
  }

  return obj;
};

export default getNodeObject;
