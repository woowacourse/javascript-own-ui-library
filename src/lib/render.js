let rootElement;

const render = ({ type, props }, parentElement) => {
  if (!rootElement) {
    rootElement = parentElement;
  }

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

  if (!parentElement) {
    // TODO : 비교하는 로직 추가하기
    rootElement.innerHTML = "";

    rootElement.appendChild(tagElement);
  } else {
    parentElement.appendChild(tagElement);
  }
};

export default render;
