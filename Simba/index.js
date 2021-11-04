export class Node {
  constructor(element) {
    this.element = element;
  }

  children = [];

  render(parent) {
    parent.appendChild(this.element);

    this.children.map((child) => child.render(this.element));
  }
}

export const el = (tag, attrs, events, children) => {
  if (tag === 'text') {
    const text = document.createTextNode(children);

    return new Node(text);
  }

  const element = document.createElement(tag);

  Object.entries(attrs).map(([name, value]) => {
    element.setAttribute(name, value);
  });

  Object.entries(events).map(([event, func]) => {
    element.addEventListener(event, func);
  });

  const node = new Node(element);
  node.children = children;

  return node;
};

export class Component {
  constructor(props) {
    this.state = {};
    this.props = props;
    this.root;
  }

  setState(nextState) {
    const keys = Object.keys(nextState);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (this.state[key] === nextState[key]) continue;

      this.state = nextState;
      this.render();
      break;
    }
  }

  st(subTree) {
    const { element, children } = subTree;

    if (this.root) {
      children.forEach((child) => child.render(element));
      this.root.replaceWith(element);
    }

    this.root = element;

    return subTree;
  }

  render() {}
}

export const cp = (ClassName, props) => {
  const component = new ClassName(props);

  return component.render();
};

export const domRender = (domTree, root) => domTree.render(root);
