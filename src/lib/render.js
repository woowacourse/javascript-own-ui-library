let rootElement;

const createReactElement = ({ type, props }) => {
  const { className, text, children, ...attributes } = props;
  const tagElement = document.createElement(type);

  // text 속성
  tagElement.textContent = text;

  // class 속성 부여하기
  if (className) {
    const classArr = className?.split(" ");
    classArr.forEach((attr) => {
      tagElement.classList.add(attr);
    });
  }

  // children
  if (Array.isArray(children)) {
    children.forEach((child) => {
      render(child, tagElement);
    });
  }

  // 기타 속성 부여하기
  for (const [key, value] of Object.entries(attributes)) {
    tagElement[key] = value;
  }

  return tagElement;
};

const render = (element, parentElement) => {
  if (!rootElement) {
    rootElement = parentElement;
  }

  const tagElement = createReactElement(element);

  if (!parentElement) {
    rootElement.innerHTML = "";
    rootElement.appendChild(tagElement);
  } else {
    parentElement.appendChild(tagElement);
  }
};

export default render;
