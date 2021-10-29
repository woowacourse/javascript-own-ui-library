const isChanged = (oldNode: Node, newNode: Node): boolean => {
  return !oldNode.isEqualNode(newNode);
};

export default isChanged;
