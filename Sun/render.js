let $latestTarget = null;
let vDom = {};

const createElement = (domObject) => {
  const element = document.createElement(domObject.type);
  const { children, className, events } = domObject.props;

  if (className) {
    element.className = className;
  }

  if (events) {
    Object.keys(events).forEach((event) =>
      element.addEventListener(event, events[event])
    );
  }

  if (typeof children === 'string' || typeof children === 'number') {
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
  if ($target) {
    $latestTarget = $target;
  }

  vDom = createElement(domObject);

  $latestTarget.innerHTML = '';
  $latestTarget.appendChild(vDom);
};

export default render;
