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

const render = (domTree, root) => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  domTree.render(root);
};

const listeners = [];
const subscribe = (listener) => listeners.push(listener);
const notify = () => listeners.forEach((listener) => listener());

let amount = 0;

const decrease = () => {
  amount -= 1;
  notify();
};

const reset = () => {
  amount = 0;
  notify();
};

const increase = () => {
  amount += 1;
  notify();
};

const domRender = () => {
  render(
    el('div', { class: 'container' }, {}, [
      el('span', { class: 'count' }, {}, [el('text', {}, {}, amount)]),
      el('div', { class: 'btn-group' }, {}, [
        el('button', {}, { click: decrease }, [
          el('strong', {}, {}, [el('text', {}, {}, '-')]),
        ]),
        el('button', {}, { click: reset }, [
          el('strong', {}, {}, [el('text', {}, {}, 'RESET')]),
        ]),
        el('button', {}, { click: increase }, [
          el('strong', {}, {}, [el('text', {}, {}, '+')]),
        ]),
      ]),
    ]),
    document.getElementById('root')
  );
};

subscribe(domRender);
domRender();
