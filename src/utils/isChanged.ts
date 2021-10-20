const isChanged = (oldNode: Node, newNode: Node): Boolean => {
  return !oldNode.isEqualNode(newNode);
};

export default isChanged;
