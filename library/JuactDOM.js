// VirtualDOM 생성 팩토리 함수
export const createElement = (type, attributes, ...children) => ({
  type,
  attributes,
  children: children.map((child) =>
    typeof child === 'function' ? child() : child
  ),
});

export const render = (vDOM, root) => {
  console.log(vDOM);
};
