function render(vDOMObject, parent) {
  console.log(vDOMObject);

  const { type, props, children } = vDOMObject;

  // 종료조건: text type인 경우
  if (type === 'text') {
    parent.innerHTML = children[0];
    return;
  }

  // current vdom node의 element 생성
  const element = document.createElement(type);

  // current vdom node에 attribute 추가
  Object.entries(props).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );

  // parent vdom node에 current vdom node를 자식으로 추가
  parent.appendChild(element);

  // children node들을 순회하며 render 호출
  children.forEach((child) => {
    render(child, element);
  });
}

export { render };
