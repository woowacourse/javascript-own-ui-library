/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import { throwError } from "../util/error.js";
import {
  mapPropsToAttributes,
  mapPropToAttribute,
  removeAttribute,
  setAttribute,
} from "./attribute.js";

const toRNode = (vnode) => {
  const { type, props, children, value } = vnode;

  const rnode =
    type === Symbol.for("textNode")
      ? document.createTextNode(value)
      : document.createElement(type);

  for (const attribute of mapPropsToAttributes(props)) {
    setAttribute(rnode, ...attribute);
  }

  for (const child of children) {
    const rchild = toRNode(child);
    rnode.append(rchild);
    child.ref = rchild;
  }

  return rnode;
};

const diff = (prev, curr) => {
  if (prev == null) {
    throwError("Invalid nullish prev");
  }

  if (curr == null) {
    prev.ref.remove();

    return;
  }

  // type이 다른 경우
  if (prev.type !== curr.type) {
    const parent = prev.ref.parentNode;
    prev.ref.remove();

    const rnode = toRNode(curr);
    parent.append(rnode);
    curr.ref = rnode;

    return;
  }

  // type 이 textNode로 같은 경우
  if (curr.type === Symbol.for("textNode")) {
    // textNode의 value가 같은 경우
    if (prev.value === curr.value) {
      curr.ref = prev.ref;

      return;
    }

    // textNode의 value가 다른 경우
    const parent = prev.ref.parentNode;
    prev.ref.remove();

    const rnode = toRNode(curr);
    parent.append(rnode);
    curr.ref = rnode;

    return;
  }

  // rnode 참조값을 curr.ref에 복사
  curr.ref = prev.ref;

  // props 비교
  for (const key of Object.keys({ ...prev.props, ...curr.props })) {
    const prevValue = prev.props[key];
    const currValue = curr.props[key];

    if (currValue == null) {
      removeAttribute(curr.ref, ...mapPropToAttribute(key, currValue));
    }

    if (prevValue !== currValue) {
      setAttribute(curr.ref, ...mapPropToAttribute(key, currValue));
    }
  }

  // children 비교
  const prevChildIter = prev.children[Symbol.iterator]();
  const currChildIter = curr.children[Symbol.iterator]();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const pr = prevChildIter.next();
    const cr = currChildIter.next();

    if (pr.done && cr.done) {
      break;
    }

    if (pr.value == null) {
      const rnode = toRNode(cr.value);
      curr.ref.append(rnode);
      cr.value.ref = rnode;

      continue;
    }

    diff(pr.value, cr.value);
  }
};

const reactDOM = (() => {
  let App = null;
  let rootContainer = null;
  let prev = null;

  const render = (Comp, container) => {
    App = Comp;
    rootContainer = container;

    const curr = Comp();

    curr.ref = toRNode(curr);
    container.append(curr.ref);

    prev = curr;
  };

  const rerender = () => {
    const curr = App();

    if (prev == null) {
      curr.ref = toRNode(curr);
      rootContainer.append(curr.ref);
    } else {
      diff(prev, curr);
    }

    prev = curr;
  };

  return { render, rerender };
})();

export const { render, rerender } = reactDOM;

export default reactDOM;
