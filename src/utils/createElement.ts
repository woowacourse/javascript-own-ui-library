const createElement = (tag, props, ...children): HTMLElement => {
  const element = document.createElement(tag);

  if (props.hasOwnProperty("event")) {
    const event = props.event;

    Object.keys(event).forEach((key) => {
      element.addEventListener(key, event[key]);
    });

    delete props.event;
  }

  Object.keys(props)?.forEach((key) => {
    element.setAttribute(key, props[key]);
  });

  children?.forEach((child) => {
    typeof child === "object"
      ? element.appendChild(child)
      : element.appendChild(document.createTextNode(child));
  });

  return element;
};

export default createElement;
