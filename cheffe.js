export class VNode {
  constructor({ nodeName, attributes, children }) {
    this.nodeName = nodeName;
    this.attributes = attributes;
    this.children = children;
  }
}

const createElement = (nodeName, attributes, children) => {
  return new VNode({
    nodeName,
    attributes,
    children,
  });
};

const Cheffe = {
  createElement,
};

export default Cheffe;
