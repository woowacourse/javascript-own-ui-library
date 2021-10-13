import { ReactElement } from "./types";

type Render = (element: ReactElement, container: HTMLElement) => void;

const React = (function () {
  const states: unknown[] = [];
  let rerender: () => void = null;
  let currentStateIndex = 0;
  let $RootDOM: HTMLElement = null;
  // const virtualDOM: ReactElement[] = [];

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

    if (children === undefined) {
      return;
    }

    if (typeof children === "string") {
      $newDOM.innerText = children;
      return;
    }

    if (typeof children === "number") {
      $newDOM.innerText = String(children);
      return;
    }

    children.forEach((child) => {
      drawToBrowser(child, $newDOM);
    });

    return $newDOM;
  };

  const render: Render = (element, container) => {
    if (!container) {
      console.error("render error: container element가 존재하지 않습니다.");
      return;
    }

    if (!rerender) {
      rerender = () => {
        render(element, container);
      };
    }

    //초기에는 바로 실제DOM에 바로 렌더링
    $RootDOM = drawToBrowser(element, container);

    //그 이후부터는 VDOM을 만들고 비교후 렌더링
    // 1. VDOM 생성
    // 2. 실제 DOM과 비교
    // 3. 바뀐 부분만 렌더링
  };

  const createElement = (
    tag: keyof HTMLElementTagNameMap,
    props: Omit<ReactElement, "nodeName">
  ): ReactElement => {
    const $element = document.createElement(tag);
    return {
      nodeName: tag,
      ...props,
    };
  };

  const useState = <T>(
    initialValue: T
  ): [state: T, setState: (value: T) => void] => {
    if (!states[currentStateIndex]) {
      states[currentStateIndex] = initialValue;
    }

    return [
      states[currentStateIndex] as T,
      (value: T) => {
        states[currentStateIndex] = value;
        rerender();
      },
    ];
  };

  return {
    render,
    createElement,
    useState,
  };
})();

export default React;
