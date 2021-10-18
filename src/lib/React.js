/**
 * VirtualDOM 생성 팩토리 함수 구현 (aka createElement)
 * @params type HTMLElementTagName | Component
 * @params props HTMLAttributes | ComponentProps
 * @params children 자식 노드
 */
export const createElement = (type, props, ...children) => ({
  type,
  props,
  children: children.filter((child) => child != null),
});

const React = {
  createElement,
};

export default React;
