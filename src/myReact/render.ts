import type { MyNode } from "./types";
import diff from "./diff";
import paint from "./paint";

interface MyDOM {
  node: MyNode | (() => MyNode) | null;
  root: HTMLElement | null;
  oldNode: MyNode | null;
  render: (node: MyNode | (() => MyNode), container: HTMLElement) => void;
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

    if (this.oldNode && !diff(this.oldNode, newNode as MyNode)) return;

    paint(newNode as MyNode, this.root as HTMLElement, true);
    this.oldNode = newNode;
  },
};

export default myDOM;
