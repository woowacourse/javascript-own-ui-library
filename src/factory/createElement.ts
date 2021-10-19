const createElement = (tag, props, children) => {
  const element = document.createElement(tag);

  Object.keys(props).forEach((key) => {
    element[key] = props[key];
  });

  children.forEach((child) => {
    element.appendChild(child);
  });

  return element;
};

export default createElement;
