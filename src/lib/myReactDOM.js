import { isClassProp, isEventProp, isPlainText } from './utils.js';

const vNodeToNode = (vNode) => {
  const { type, props } = vNode;

  const $node = typeof type === 'string' ? document.createElement(type) : vNodeToNode(type(props));

  const { children, ...rest } = props;

  Object.entries(rest).forEach(([key, value]) => {
    if (isClassProp(key)) {
      $node.setAttribute('class', value);
    }

    if (isEventProp(key)) {
      const eventName = key.replace('on', '').toLowerCase();

      $node.addEventListener(eventName, value);
    }

    $node.setAttribute(key, value);
  });

  children.forEach((child) => {
    const $child = isPlainText(child) ? document.createTextNode(child) : vNodeToNode(child);

    $node.append($child);
  });

  return $node;
};

const render = (Component, $element) => {
  const $target = vNodeToNode(Component);

  $element.innerHTML = '';
  $element.append($target);
};

export default {
  render,
};
