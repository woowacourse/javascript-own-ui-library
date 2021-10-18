import { ReactComponent, ReactElement } from "./types";

type Render = (element: ReactComponent, container: HTMLElement) => void;

const React = (function () {
  const states: unknown[] = [];
  let rerender: () => void;
  let currentStateIndex = 0;
  let $actualDOM: HTMLElement;
  let virtualDOM: HTMLElement;

  const convertReactElementToDOM = (element: ReactElement) => {
    const $newDOM = document.createElement(element.nodeName);

    if (element?.className) {
      $newDOM.className = element.className;
    }

    if (element?.onClick) {
      $newDOM.addEventListener("click", element.onClick);
    }

    if (element?.className) {
      $newDOM.className = element.className;
    }

    return $newDOM;
  };

  const getDOMElementToRender = (element: ReactElement): HTMLElement => {
    const $newDOM = convertReactElementToDOM(element);
    const children = element.children;

    if (children === undefined) {
      return;
    }

    if (typeof children === "string") {
      $newDOM.innerText = children;
      return $newDOM;
    }

    if (typeof children === "number") {
      $newDOM.innerText = String(children);
      return $newDOM;
    }

    children.forEach((child) => {
      const childToAppend = getDOMElementToRender(child);

      if (childToAppend !== undefined) {
        $newDOM.appendChild(childToAppend);
      }
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

    virtualDOM = getDOMElementToRender(element());
    container.replaceChildren(virtualDOM);
    $actualDOM = virtualDOM;
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
    if (states[currentStateIndex] === undefined) {
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
