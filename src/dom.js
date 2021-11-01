export const createElement = (tagName, attributes, children) => {
  if (typeof children === 'object') {
    return { tagName, attributes, children };
  } else {
    return { tagName, attributes, innerText: children };
  }
};
