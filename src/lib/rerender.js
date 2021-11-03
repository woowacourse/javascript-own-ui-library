import render from "./render.js";

const rerender = (VDOM, rootElement) => {
  // 전체 리렌더링을 하고 있어서, 초기화 해주는 작업이 필요해서 추가한 코드
  rootElement.innerHTML = "";
  render(VDOM, rootElement);
};

export default rerender;
