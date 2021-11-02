import type { MyElementNode, MyTextNode } from "./types";
import diff from "./diff";
import paint from "./paint";
import createElement from "./createElement";

interface MyDOM {
  node: MyElementNode | (() => MyElementNode) | null;
  root: HTMLElement | null;
  oldNode: MyElementNode | null;
  render: (
    node: MyElementNode | (() => MyElementNode),
    container: HTMLElement
  ) => void;
  _render: () => void;
}

const myDOM: MyDOM = {
  node: null,
  root: null,
  oldNode: null,

  render(node, container) {
    this.node = node;
    this.root = container;

    this._render();
  },

  _render() {
    const newNode = typeof this.node === "function" ? this.node() : this.node;

    if (!diff(this.oldNode, newNode!)) return;

    paint(newNode, this.root, true);
    this.oldNode = newNode;
  },
};

export default myDOM;
