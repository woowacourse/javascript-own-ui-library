//<div class="container">
//  <span class="count">0</span>
//  <div class="btn-group">
//    <button>
//      <strong>-</strong>
//   </button>
//    <button>
//      <strong>RESET</strong>
//    </button>
//    <button>
//      <strong>+</strong>
//    </button>
//  </div>
//</div>;

// const createElement = (tag, attr, event) => (children) => ({
//   tag,
//   attr,
//   event,
//   children,
// });
// const render = (domTree, root) => {};

// let amount = 0;
// const setAmount = () => {};

// const $root = document.getElementById('#root');
// const container = createElement('div', { class: 'container' });
// const count = createElement('span', { class: 'count' });
// const buttonGroup = createElement('div', { class: 'btn-group' });
// const button = createElement('button', {});
// const strong = createElement('strong', {});

// render(
//   container([
//     count(),
//     buttonGroup([
//       button([strong(['-'])]),
//       button([strong(['reset'])]),
//       button([strong(['+'])]),
//     ]),
//   ]),
//   $root
// );

// const render = (() => {
//   const test = 1;

//   return (domTree, root) => {

//     callback();
//   };
// })();

// 사용자의 입력을 엘리먼트로 바꿔주는 친구

// element를 만든다. => 노드 클래스에 넣는다. => 트리거가 있어서 렌더가 발생을 한다.

class Node {
  constructor(element) {
    this.element = element;
  }

  children = [];

  render(parent) {
    parent.appendChild(this.element);

    this.children.map((child) => child.render(this.element));
  }
}

const el = (tag, attrs, events, children) => {
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

class Component {
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

const cp = (ClassName, props) => {
  const component = new ClassName(props);

  return component.render();
};

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const subTree = this.st(
      el('span', { class: 'count' }, {}, [
        el('text', {}, {}, this.props.amount),
      ])
    );

    return subTree;
  }
}
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: 0 };

    this.decrease = this.decrease.bind(this);
    this.reset = this.reset.bind(this);
    this.increase = this.increase.bind(this);
  }

  decrease() {
    this.setState({ amount: this.state.amount - 1 });
  }

  reset() {
    this.setState({ amount: 0 });
  }

  increase() {
    this.setState({ amount: this.state.amount + 1 });
  }

  render() {
    return this.st(
      el('div', { class: 'container' }, {}, [
        cp(Count, { amount: this.state.amount }),
        el('div', { class: 'btn-group' }, {}, [
          el('button', {}, { click: this.decrease }, [
            el('strong', {}, {}, [el('text', {}, {}, '-')]),
          ]),
          el('button', {}, { click: this.reset }, [
            el('strong', {}, {}, [el('text', {}, {}, 'RESET')]),
          ]),
          el('button', {}, { click: this.increase }, [
            el('strong', {}, {}, [el('text', {}, {}, '+')]),
          ]),
        ]),
      ])
    );
  }
}

const domRender = (domTree, root) => domTree.render(root);

domRender(cp(Container, {}), document.getElementById('root'));
