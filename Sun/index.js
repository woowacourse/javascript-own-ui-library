let vDom = {};

const createElement = (domObject) => {
  const element = document.createElement(domObject.type);
  const { children, className } = domObject.props;

  if (className) {
    element.className = className;
  }

  if (typeof children === 'string') {
    element.textContent = children;
  }

  if (Array.isArray(children)) {
    children.forEach((dom) => element.appendChild(createElement(dom)));
  }

  if (children.type) {
    element.appendChild(createElement(children));
  }

  return element;
};

const render = (domObject, $target) => {
  vDom = createElement(domObject);

  $target.appendChild(vDom);
};

export default { render };
