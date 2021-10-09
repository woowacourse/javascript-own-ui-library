import idGenerator from './utils/idGenerator.js';

const createElement = (tagName, params) => {
  const appendChild = (child) => {
    if (node.children.find(({ key }) => child.key === key)) {
      console.log('on');
      return;
    }

    node.children.push(child);
    child.parent = node;
  };

  const removeChild = (child) => {
    console.log(remove);
  };

  const addEventListener = (eventType, listener) => {
    node.eventListener[eventType] = listener;
  };

  const node = {
    tagName,
    ...params,
    parent: null,
    children: [],
    eventListener: {},
    appendChild,
    removeChild,
    addEventListener,
  };

  if (!params.key) {
    node['key'] = idGenerator.getId();
  }

  if (params.children) {
    node.children = params.children;
  }

  return node;
};

export default createElement;
