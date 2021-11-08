import { isKeyOf } from "./typeGuard";
import { Props, ReactComponent, ReactElement } from "./types";
import { getDOMElementToRender, updateOnlyChangedDOM } from "./util";

type Render = (element: ReactComponent, container: HTMLElement) => void;

interface State<T> {
  value: T;
}

const React = (function () {
  let states: State<unknown>[] = [];
  let RootComponent: ReactComponent;
  let $rootContainer: Element;
  let stateIndex = 0;
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

  const rerender = () => {
    stateIndex = 0;
    const $virtualDOM = getDOMElementToRender(RootComponent());

    updateOnlyChangedDOM($virtualDOM, $actualDOM);
  };

  const createElement = (
    tag: keyof HTMLElementTagNameMap,
    props: Props
  ): ReactElement => {
    return {
      nodeName: tag,
      ...props,
      onClick: () => {
        if (typeof props.onClick === "function") {
          const beforeStates = states;
          props.onClick();

          if (beforeStates !== states) {
            rerender();
          }
        }
      },
    };
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
          states = [...states];
          states[currentStateIndex][prop] = value;

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
