const isEmpty = (obj: any): Boolean => {
  return Object.keys(obj).length === 0;
};

const render = (() => {
  let oldNode;

  const inner = (target: Element, node: Node): void => {
    if (!oldNode) {
      target.appendChild(node);

      oldNode = node.childNodes;
    } else {
      target.innerHTML = "";
      target.appendChild(node);
    }
  };

  return inner;
})();

export default render;
