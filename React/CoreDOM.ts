import Core from "./Core";
import { Props, ReactComponent, ReactElement, Render } from "./util/types";
import { getDOMElementToRender, updateOnlyChangedDOM } from "./util/DOMUtil";

const CoreDOM = (function () {
  let RootComponent: ReactComponent;
  let $rootContainer: Element;
  let $actualDOM: HTMLElement;

  const createReactElement = (
    tag: keyof HTMLElementTagNameMap,
    props: Props
  ): ReactElement => {
    return {
      nodeName: tag,
      ...props,
      onClick: () => {
        if (typeof props.onClick === "function") {
          const beforeStates = Core.states;
          props.onClick();

          if (beforeStates !== Core.states) {
            rerender();
          }
        }
      },
    };
  };

  const render: Render = (Component, $container) => {
    const isRoot = !RootComponent && !$rootContainer;

    if (!isRoot) {
      return;
    }

    RootComponent = Component;
    $rootContainer = $container;

    const $virtualDOM = getDOMElementToRender(RootComponent());
    $rootContainer.replaceChildren($virtualDOM);
    $actualDOM = $virtualDOM;
  };

  const rerender = () => {
    Core.initStateIndex();
    const $virtualDOM = getDOMElementToRender(RootComponent());

    updateOnlyChangedDOM($virtualDOM, $actualDOM);
  };

  return {
    render,
    createReactElement,
  };
})();

export default CoreDOM;
