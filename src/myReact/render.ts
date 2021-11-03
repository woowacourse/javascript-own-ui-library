import diff from "./diff";
import paint, { createRealNode } from "./createRealNode";
import type { MyElementNode } from "./types";

interface MyDOM {
  node: MyElementNode | (() => MyElementNode) | null;
  root: HTMLElement | null;
  oldVNode: MyElementNode | null;
  realNode: HTMLElement | null;
  render: (
    node: MyElementNode | (() => MyElementNode),
    container: HTMLElement
  ) => void;
  _render: () => void;
}

const myDOM: MyDOM = {
  node: null,
  root: null,
  oldVNode: null,
  realNode: null,

  render(node, container) {
    this.node = node;
    this.root = container;

    this._render();
  },

  _render() {
    if (!this.root || !this.node) {
      throw new Error("myDOM이 초기화되지 않았습니다. render를 호출해주세요.");
    }

    const newVNode = typeof this.node === "function" ? this.node() : this.node;

    if (!this.realNode || !this.oldVNode) {
      this.realNode = createRealNode(newVNode);
      this.root.replaceChildren(this.realNode);
    } else {
      diff(this.root, this.realNode, this.oldVNode, newVNode);
    }

    this.oldVNode = newVNode;
  },
};

export default myDOM;
