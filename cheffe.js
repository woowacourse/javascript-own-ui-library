export class VNode {
  constructor({ key, nodeName, attributes, children }) {
    this.key = key;
    this.nodeName = nodeName;
    this.attributes = attributes;
    this.children = children;
  }
}

const createElement = (() => {
  let nextId = -1;

  return (nodeName, attributes, children) => {
    nextId += 1;

    return new VNode({
      key: nextId,
      nodeName,
      attributes,
      children,
    });
  };
})();

const Cheffe = {
  createElement,
};

export default Cheffe;
