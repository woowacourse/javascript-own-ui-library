import { ReactElement } from "./types";

const React = (function () {
  let $RootDOM: HTMLElement = null;
  const virtualDOM: ReactElement[] = [];

  const drawToBrowser = (
    element: ReactElement,
    container: HTMLElement
  ): HTMLElement => {
    const $newDOM = document.createElement(element.nodeName);

    if (element?.className) {
      $newDOM.className = element.className;
    }

    container.appendChild($newDOM);

    const children = element.children;

    if (!children) {
      return;
    }

    if (typeof children === "string") {
      $newDOM.innerText = children;
      return;
    }

    children.forEach((child) => {
      drawToBrowser(child, $newDOM);
    });

    return $newDOM;
  };

  return {
    render: (element: ReactElement, container: HTMLElement) => {
      if (!container) {
        console.error("render error: container element가 존재하지 않습니다.");
        return;
      }

      //초기에는 바로 실제DOM에 바로 렌더링
      $RootDOM = drawToBrowser(element, container);

      //그 이후부터는 VDOM을 만들고 비교후 렌더링
      // 1. VDOM 생성
      // 2. 실제 DOM과 비교
      // 3. 바뀐 부분만 렌더링
    },
    createElement: (
      tag: keyof HTMLElementTagNameMap,
      props: Omit<ReactElement, "nodeName">
    ): ReactElement => {
      const $element = document.createElement(tag);
      return {
        nodeName: tag,
        ...props,
      };
    },
  };
})();

export default React;
