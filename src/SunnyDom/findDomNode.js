import createDomNode from './createDomNode.js';

/* targetNode : SunnyDomNode */
const findDomNode = (targetNode) => {
  const { id, class: className, tagName } = targetNode;
  const innerHTML = createDomNode(targetNode).innerHTML;

  const selector = id ? `#${id}` : className ? `.${className}` : tagName;
  const $node = [...document.querySelectorAll(selector)].find(($elem) => $elem.innerHTML === innerHTML);

  return $node;
};

export default findDomNode;
