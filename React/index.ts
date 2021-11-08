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
    const $virtualDOM = getDOMElementToRender(RootComponent());

    updateOnlyChangedDOM($virtualDOM, $actualDOM);
  };

  const useState = <T>(initialValue: T): State<T> => {
    //TODO: stateIndex 활용해서 여러 state를 사용할 수 있도록 해야함.
    if (states[stateIndex] === undefined) {
      states[stateIndex] = {
        value: initialValue,
      };
    }

    return new Proxy(states[stateIndex] as State<T>, {
      get(obj, prop) {
        if (isKeyOf(obj, prop)) {
          return { ...states[stateIndex] }[prop];
        }
      },
      set(obj, prop, value) {
        if (isKeyOf(obj, prop)) {
          states[stateIndex][prop] = value;
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
