import isChanged from "./isChanged";
import isEmptyObject from "./isEmptyObject";

const render = (() => {
  const oldNodeObj = {};

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

  const rerender = (
    target: Element,
    newNodeObj: { [key: string]: Element },
    oldNodeObj: { [key: string]: Element }
  ) => {
    if (isEmptyObject(newNodeObj) || isEmptyObject(oldNodeObj)) return;

    for (const key of Object.keys(newNodeObj)) {
      if (!isChanged(newNodeObj[key], oldNodeObj[key])) {
        continue;
      }

      if (isChanged(newNodeObj[key], oldNodeObj[key])) {
        target.querySelector(`[key="${key}"]`).replaceWith(newNodeObj[key]);
        continue;
      }

      // 새로운 노드
      if (!oldNodeObj.hasOwnProperty(key)) {
        target.appendChild(newNodeObj[key]);
        oldNodeObj[key] = newNodeObj[key];

        continue;
      }

      // new 자식 o && old 자식 x
      if (newNodeObj[key].children.length && !oldNodeObj[key].children.length) {
        target.querySelector(`[key="${key}"]`).replaceWith(newNodeObj[key]);

        continue;
      }

      // new 자식 x && old 자식 o
      if (!newNodeObj[key].children.length && oldNodeObj[key].children.length) {
        const targetElement = target.querySelector(`[key="${key}"]`);

        while (targetElement.firstChild) {
          targetElement.removeChild(targetElement.firstChild);
        }

        continue;
      }

      // new 자식 o && old 자식 o
      for (const childKey of Object.keys(newNodeObj[key])) {
        rerender(target, getNodeObject(newNodeObj[key][childKey]), getNodeObject(oldNodeObj[key][childKey]));
      }
    }
  };

  const _render = (target: Element, node: Element): void => {
    if (isEmptyObject(oldNodeObj)) {
      target.appendChild(node);

      getNodeObject(node, oldNodeObj);
    } else {
      const newNodeObj = getNodeObject(node);

      rerender(target, newNodeObj, oldNodeObj);
    }
  };

  return _render;
})();

export default render;
