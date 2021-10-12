import { TEXT_NODE } from './constants/constant.js';

const commit = (vNode, container) => {
  const {
    type,
    props: { children, ...attrs },
  } = vNode;

  const node = Object.entries(attrs).reduce(
    (node, [key, value]) => {
      node[key] = value;

      return node;
    },
    type === TEXT_NODE
      ? document.createTextNode('')
      : document.createElement(type)
  );

  if (!children) {
  } else if (Array.isArray(children)) {
    children.forEach(child => commit(child, node));
  } else if (typeof children === 'object') {
    commit(children, node);
  } else {
    throw new Error('Invalid children type.');
  }

  container.append(node);

  return node;
};

const ReactDOM = (() => {
  let latestVNode = null;
  let root = null;

  return {
    render(vNode, container) {
      if (vNode && container) {
        root = container;
        latestVNode = vNode;

        return commit(vNode(), container);
      }

      //TODO: diff
      root.innerHTML = '';
      commit(latestVNode(), root);
    },
  };
})();

export default ReactDOM;
