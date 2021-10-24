import { ReactComponent, ReactElement } from "./types";
import { getDOMElementToRender, updateOnlyChangedDOM } from "./util";

type Render = (element: ReactComponent, container: HTMLElement) => void;

const React = (function () {
  const states: unknown[] = [];
  let RootComponent: ReactComponent;
  let $rootContainer: Element;
  let currentStateIndex = 0;
  let $actualDOM: HTMLElement;

  const render: Render = (Component, $container) => {
    const isFirst = !RootComponent && !$rootContainer;

    if (!isFirst) {
      return;
    }

    RootComponent = Component;
    $rootContainer = $container;

    const $virtualDOM = getDOMElementToRender(RootComponent());
    $rootContainer.replaceChildren($virtualDOM);
    $actualDOM = $virtualDOM;
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

  const rerender = () => {
    const $virtualDOM = getDOMElementToRender(RootComponent());

    updateOnlyChangedDOM($virtualDOM, $actualDOM);
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
