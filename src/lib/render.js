const render = ({ type, props }, rootElement) => {
  const { className, children, ...attributes } = props;

  const tagElement = document.createElement(type);

  // class 속성 부여하기
  if (className) {
    const classArr = className?.split(" ");
    classArr.forEach((attr) => {
      tagElement.classList.add(attr);
    });
  }

  // 기타 속성 부여하기
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      tagElement[key] = value;
    }
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === "object") {
        render(child, tagElement);
      } else {
        tagElement.appendChild(child);
      }
    });
  } else {
    tagElement.innerText = children;
  }

  rootElement.appendChild(tagElement);
};

export default render;
