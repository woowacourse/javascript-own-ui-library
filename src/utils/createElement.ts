const createElement = (tag, props, children): Node => {
  const element = document.createElement(tag);

  Object.keys(props)?.forEach((key) => {
    element[key] = props[key];
  });

  if (typeof children !== "object") {
    element.innerHTML = children;
  } else {
    element.appendChild(children);
  }

  return element;
};

export default createElement;
