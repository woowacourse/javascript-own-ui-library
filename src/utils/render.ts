import isEmptyObject from "./isEmptyObject";

const render = (() => {
  const oldNode = {};

  const setNodeObject = (node: Element, obj = oldNode) => {
    if (node.hasChildNodes()) {
      obj[node.getAttribute("key")] = node;

      [...node.children].forEach((child) => {
        setNodeObject(child, obj[node.getAttribute("key")]);
      });
    } else {
      obj[node.getAttribute("key")] = node;
    }
  };

  const render = (target: Element, node: Element): void => {
    if (isEmptyObject(oldNode)) {
      target.appendChild(node);

      setNodeObject(node);
    } else {
      // NOTE 비교 없이 덮어쓰는 경우
      // target.innerHTML = "";
      // target.appendChild(node);

      const newNode = {};
      setNodeObject(node, newNode);

      console.log(newNode);
    }
  };

  return render;
})();

export default render;
