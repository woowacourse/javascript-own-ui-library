const createElement = (
  tag: string,
  props: { [key: string]: string },
  ...children
): HTMLElement => {
  const element = document.createElement(tag);

  Object.keys(props)?.forEach((key) => {
    element[key] = props[key];
  });

  children?.forEach((child) => {
    typeof child === "object"
      ? element.appendChild(child)
      : element.appendChild(document.createTextNode(child));
  });

  return element;
};

export default createElement;
