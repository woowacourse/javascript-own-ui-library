const render = (() => {
  let oldNode;

  const inner = (target: Element, node: Node): void => {
    if (!oldNode) {
      target.appendChild(node);

      oldNode = node.childNodes;
    } else {
      // NOTE 비교 없이 덮어쓰는 경우
      target.innerHTML = "";
      target.appendChild(node);
    }
  };

  return inner;
})();

export default render;
