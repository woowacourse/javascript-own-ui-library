const render = ({ type, props }, rootElement) => {
  const { className, text, children, ...attributes } = props;

  const tagElement = document.createElement(type);

  // class 속성 부여하기
  if (className) {
    const classArr = className?.split(" ");
    classArr.forEach((attr) => {
      tagElement.classList.add(attr);
    });
  }

  // text 속성
  if (String(text)) {
    tagElement.textContent = text;
  }

  // 기타 속성 부여하기
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      tagElement[key] = value;
    }
  }

  // children
  if (Array.isArray(children)) {
    children.forEach((child) => {
      render(child, tagElement);
    });
  }

  rootElement.appendChild(tagElement);
};

export default render;
