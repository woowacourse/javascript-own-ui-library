import { ERROR_MESSAGE } from './constants.js';

export class VNode {
  #key;

  constructor({ key, nodeName, attributes, children }) {
    this.#key = key;
    this.nodeName = nodeName;
    this.attributes = attributes;
    this.children = children;
  }

  static isEqual(vNodeA, vNodeB) {
    if (!vNodeA instanceof VNode || !vNodeB instanceof VNode) {
      throw new Error(ERROR_MESSAGE.VNODE.INVALID_PARAMETER_TYPE_IS_EQUAL);
    }

    if (JSON.stringify(vNodeA) !== JSON.stringify(vNodeB)) {
      return false;
    }

    return true;
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
