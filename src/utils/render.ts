const isEmpty = (obj: any): Boolean => {
  return Object.keys(obj).length === 0;
};

const render = (() => {
  const oldNoe = {};

  const inner = (target: Element, node: Node): void => {
    if (isEmpty(oldNoe)) {
      // target.appendChild(node);
      // oldNoe["root"] = node;

      // console.log(oldNoe);

      console.log(node);

      target.appendChild(node);
    } else {
    }
  };

  return inner;
})();

export default render;
