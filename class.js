export class RootNode {
  constructor(children = []) {
    this.children = children;
  }

  append(child) {
    this.children.push(child);
  }
}

export class Node {
  constructor(tagName, attributes, children = []) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
  }

  append(child) {
    this.children.push(child);
  }
}

export class TextNode {
  constructor(value) {
    this.value = value;
  }
}
