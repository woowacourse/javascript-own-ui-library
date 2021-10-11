import React from 'react';

const ReactDOM = {
  render: (element, rootElement) => {
    // 1.VirtualDOM 만들기
    const newVirtualDOM = ReactDOM.getVDOM(element);
    console.log(newVirtualDOM);
    // 2. 기존 Virtual DOM과 비교하기
    // 3. 다르면 rerender
    ReactDOM.reRender(newVirtualDOM, rootElement);
  },
  getVDOM: element => {
    console.log(element);
    // props는 현재 element에 속해있는 속성들을 가지고 있다.
    // <div class='container' onClick={() => {}}> 의 경우
    // ['class', 'container', 'onClick', f, children, Array(2)]
    // 의 정보를 가지고 있다.
    // 이 props를 순회해서, key값에 따라 처리해주면 된다.
    const { type, props } = element;

    // 1. Virtual DOM 만들기 (type, props, children 으로 구성)
    const virtualDOM = {
      type,
      props: {
        // ...props, 추가 속성 추가해주면 된다.
        className: props.class ?? null,
        onClick: props.onClick ?? null,
      },
      children:
        Object(props.children) === props.children
          ? [props.children].flat().map(children => ReactDOM.getVDOM(children))
          : props.children,
    };

    return virtualDOM;
  },

  // 2. 기존 Virtual DOM 과 비교하기 *************

  // 3. 다르면 rerender();
  reRender: (virtualDOM, rootElement) => {
    const { type, props, children } = virtualDOM;
    console.log(type, props, type === 'TEXT_ELEMENT');

    const VDOMElement = Object.entries(props).reduce(
      (totalNode, [key, value]) => {
        if (key !== 'children') {
          totalNode[key] = value;
        }

        return totalNode;
      },
      type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(type)
    );

    Object(children) === children
      ? children.forEach(child => ReactDOM.reRender(child, VDOMElement))
      : VDOMElement.appendChild(document.createTextNode(children));
    rootElement.appendChild(VDOMElement);
  },
};

// 커스텀 useState ====
const customUseState = value => {
  const store = {
    value,
  };

  const setState = newValue => {
    // 만약 newValue가 value와 다르다면 (추가)
    store.value = newValue;
    // rerender
  };

  return [store.value, setState];
};

// 실습 ====
const [appState, setAppState] = customUseState(0); // *************

const AppElement = (
  <div class='container' onClick={() => {}}>
    <span class='count'>{appState}</span>
    <div class='btn-group'>
      <button>
        <strong>-</strong>
      </button>
      <button>
        <strong>RESET</strong>
      </button>
      <button>
        <strong>+</strong>
      </button>
    </div>
  </div>
);

console.log(ReactDOM.render(AppElement, document.getElementById('root')));
