const isEmpty = (obj: any): Boolean => {
  return Object.keys(obj).length === 0;
};

const render = (() => {
  const oldNoe = {};

  const inner = (target: Element, node: Node): void => {
    if (isEmpty(oldNoe)) {
      target.appendChild(node);
      oldNoe["root"] = node;
    } else {
    }
  };

  return inner;
})();

export default render;
