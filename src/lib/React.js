const textNodeSymbol = Symbol.for("textNode");

export const createTextNode = (value) => ({
  type: textNodeSymbol,
  props: {},
  children: [],
  value,
});

/**
 * VirtualDOM 생성 팩토리 함수 구현 (aka createElement)
 * @params type HTMLElementTagName | Component
 * @params props HTMLAttributes | ComponentProps
 * @params children 자식 노드
 */
export const createElement = (type, props, ...children) => {
  if (typeof type === "function") {
    return type();
  }

  return {
    type,
    props: props ?? {},
    children: children
      .filter((child) => child != null)
      .map((child) => {
        if (typeof child === "function") {
          return createElement(child);
        }

        if (typeof child === "object") {
          return child;
        }

        return createTextNode(child);
      }),
  };
};

const React = {
  createElement,
  createTextNode,
};

export default React;
