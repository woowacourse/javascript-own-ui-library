// 각각의 element를 만듭니다.
// element들의 집합은 virtualDOM이 됩니다.
// virtualDOM은 type, attributes, children 등이 key가 부여되어 있으며, 함수는 구분되어 있는 객체입니다.
export const createElement = (type, attributes, ...children) => ({
  type,
  attributes,
  children: children.map((child) =>
    typeof child === 'function' ? child() : child
  ),
});

// virtualDOM을 순회하면서 실제 DOM에 반영할 element를 생성합니다.
const createDOM = (vDOM, parentFragment) => {
  const { type, attributes, children } = vDOM;
  const element = document.createElement(type);

  if (type === 'text') {
    parentFragment.textContent = children[0];

    return;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    typeof value === 'function'
      ? element.addEventListener(key, value)
      : element.setAttribute(key, value);
  });

  parentFragment.appendChild(element);

  children.map((child) => {
    createDOM(child, element);
  });
};

export const render = (vDOM, root) => {
  const fragment = document.createDocumentFragment();

  createDOM(vDOM, fragment);
  root.appendChild(fragment);
};
