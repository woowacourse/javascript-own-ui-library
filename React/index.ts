import { isKeyOf } from "./typeGuard";
import { Props, ReactComponent, ReactElement } from "./types";
import { getDOMElementToRender, updateOnlyChangedDOM } from "./util";

type Render = (element: ReactComponent, container: HTMLElement) => void;

interface State<T> {
  value: T;
}

const React = (function () {
  const states: State<unknown>[] = [];
  let RootComponent: ReactComponent;
  let $rootContainer: Element;
  let stateIndex = 0;
  let $actualDOM: HTMLElement;

  const createElement = (
    tag: keyof HTMLElementTagNameMap,
    props: Props
  ): ReactElement => {
    return {
      nodeName: tag,
      ...props,
    };
  };

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

  const rerender = () => {
    stateIndex = 0;
    const $virtualDOM = getDOMElementToRender(RootComponent());

    updateOnlyChangedDOM($virtualDOM, $actualDOM);
  };

  const useState = <T>(initialValue: T): State<T> => {
    const currentStateIndex = stateIndex;
    stateIndex++;

    if (states[currentStateIndex] === undefined) {
      states[currentStateIndex] = {
        value: initialValue,
      };
    }

    return new Proxy(states[currentStateIndex] as State<T>, {
      get(obj, prop) {
        if (isKeyOf(obj, prop)) {
          return { ...states[currentStateIndex] }[prop];
        }
      },
      set(obj, prop, value) {
        if (isKeyOf(obj, prop)) {
          states[currentStateIndex][prop] = value;
          // TODO: 이벤트 콜백마다 setState 모아서 수정한뒤 한번에 rerender하기
          rerender();
          return true;
        }

        return false;
      },
    });
  };

  return {
    render,
    createElement,
    useState,
  };
})();

export default React;
