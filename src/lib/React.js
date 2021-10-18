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
export const createElement = (type, props, ...children) => ({
  type,
  props: props ?? {},
  children: children
    .filter((child) => child != null)
    .map((child) =>
      typeof child !== "object" ? createTextNode(child) : child
    ),
});

const React = {
  createElement,
  createTextNode,
};

export default React;
