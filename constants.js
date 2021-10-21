export const ERROR_MESSAGE = {
  RENDER: {
    EMPTY_ROOT_ELEMENT:
      'rootElement가 비어있습니다. 렌더할 HTML 요소를 parameter에 할당해주세요.',
    ONLY_CALL_ONCE: 'render는 한 번만 호출할 수 있습니다.',
    INVALID_VNODE:
      '`Cheffe.createElement`로 생성한 객체를 parameter에 할당해주세요.',
  },
  VNODE: {
    INVALID_PARAMETER_TYPE_IS_EQUAL:
      'isEqual 메소드의 인자는 VNode 객체여야 합니다.',
  },
};
