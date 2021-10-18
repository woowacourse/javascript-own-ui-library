/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { throwError } from "../util/error.js";

const DICT = {
  className: "class",
};

const table = {
  attr($element, key, value, command) {
    if (command === "append" || command === "replace") {
      $element.setAttribute(key, value);
      return $element;
    }

    if (command === "remove") {
      $element.removeAttribute(key);
      return $element;
    }

    if (command === "keep") {
      return $element;
    }

    throwError(`[table][attr] invalid Command ${command}`);
  },
  event($element, key, value, command) {
    if (command === "append" || command === "replace") {
      $element[key] = value;
      return $element;
    }

    if (command === "remove") {
      $element[key] = null;
      return $element;
    }

    if (command === "keep") {
      return $element;
    }

    throwError(`[table][event] invalid Command ${command}`);
  },
};

const router = ($element, key, value, type, command = "append") =>
  table[type]?.($element, key, value, command) ??
  throwError(`Invalid type: ${key} ${value} ${type}`);

const mapPropToAttribute = (key, value) => {
  if (/^on/.test(key)) {
    return [key.toLowerCase(), value, "event"];
  }

  return [key in DICT ? DICT[key] : key, value, "attr"];
};

const mapPropsToAttributes = (props) =>
  Object.entries(props).map(([key, value]) => mapPropToAttribute(key, value));

const convert = (vnode) => {
  const { type, props = {}, children = [], value } = vnode;
  console.log(type, props, children);

  const rnode =
    type === Symbol.for("textNode")
      ? document.createTextNode(value)
      : document.createElement(type);

  for (const attribute of mapPropsToAttributes(props)) {
    router(rnode, ...attribute);
  }

  for (const child of children) {
    rnode.appendChild(convert(child));
  }

  vnode.ref = rnode;

  return rnode;
};

const findCommand = (p, c, equal = (a, b) => a === b) => {
  if (p == null && c != null) return "append";
  if (p != null && c == null) return "remove";
  if (!equal(p, c)) return "replace";

  return "keep";
};

const diff = (prev, curr) => {
  console.log("[diff] ", prev, curr);

  //  if (typeof prev !== "object" || typeof curr !== "object") {
  //   return { value: curr, command: findCommand(prev, curr) };
  // }

  if (prev == null && curr == null) {
    return throwError("Invalid nullish prev and curr");
  }

  // if (prev == null) {
  //   const parent = prev.ref.parentNode;

  //   parent.appendChild(convert(curr));

  //   return { ...curr, command: "append" };
  // }

  if (curr == null) {
    prev.ref.remove();

    return;
  }

  if (prev.type !== curr.type) {
    const parent = prev.ref.parentNode;
    prev.ref.remove();
    convert(curr);
    parent.appendChild(curr.ref);

    return;
  }

  if (curr.type === Symbol.for("textNode")) {
    if (prev.value === curr.value) {
      curr.ref = prev.ref;
      return;
    }

    const parent = prev.ref.parentNode;
    prev.ref.remove();

    convert(curr);
    parent.appendChild(curr.ref);

    return;
  }

  curr.ref = prev.ref;

  // props 비교
  for (const key of Object.keys({ ...prev.props, ...curr.props } ?? {})) {
    const prevValue = prev.props[key];
    const currValue = curr.props[key];

    router(
      curr.ref,
      ...mapPropToAttribute(key, currValue),
      findCommand(prevValue, currValue)
    );
  }

  // // children 비교
  const prevChildren = prev.children[Symbol.iterator]();
  const currChildren = curr.children[Symbol.iterator]();

  while (true) {
    const pr = prevChildren.next();
    const cr = currChildren.next();

    if (pr.done && cr.done) {
      break;
    }

    if (pr.value == null) {
      curr.ref.appendChild(convert(cr.value));

      // eslint-disable-next-line no-continue
      continue;
    }

    diff(pr.value, cr.value);
  }
};

const reactDOM = (() => {
  let el = null;
  let cnt = null;
  let prev = null;
  let rdom = null;

  const render = (element = el, container = cnt) => {
    el = element;
    cnt = container;
    console.log("prev", prev);

    const curr = element();
    rdom = convert(curr);

    container.innerHTML = "";
    container.appendChild(rdom);

    // preserve curr
    prev = curr;
  };

  const rerender = () => {
    const curr = el();

    diff(prev, curr);
    console.log("[rerender] curr ", curr);

    prev = curr;
  };

  return { render, rerender };
})();

export default reactDOM;
