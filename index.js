// 1. 렌더링할 html 태그
// const element = (
//   <div class='container'>
//     <span class='count'>0</span>
//     <div class='btn-group'>
//       <button>
//         <strong>-</strong>
//       </button>
//       <button>
//         <strong>RESET</strong>
//       </button>
//       <button>
//         <strong>+</strong>
//       </button>
//     </div>
//   </div>
// );

// 2. 를 객체형태로 변환. (생략)
// const VDOM = (value = 0) =>
//   e('div', { class: 'container' }, [
//     e('span', { class: 'count' }, value),
//     e('div', { class: 'btn-group' }, [
//       e('button', null, [e('strong', null, '-')]),
//       e('button', null, [e('strong', null, 'RESET')]),
//       e('button', null, [e('strong', null, '+')]),
//     ]),
//   ]);

// 3. 주어진 객체 형태의 html를 VDOM 객체 형태로 변환
// VDOM 구조 예제
// {
//   type: 'div';
//   props: {
//     className: 'container';
//     children: [
//       {
//         type: 'strong',
//         props: {
//           'children': '+',
//         },
//       },
//     ];
//   }
// }
// const e = (type, props, children) => {
//   return {
//     type,
//     props: {
//       className: props?.class ?? null,
//       children: children,
//     },
//   };
// };

// 부모에 자식 append

// const [counter, setCounter] = useState(value);
const useState = value => {
  const store = {
    value, // 보통 난수화 해서 가질듯?
  };

  const setState = newValue => {
    store.value = newValue;
    console.log('setState', store.value);
    // rerender
  };

  return [store.value, setState];
};

const [counter, setCounter] = useState(1);
setCounter(2);

const virtualDom = value => {
  return {
    'type': 'div',
    'props': {
      'className': 'container',
      'children': [
        {
          'type': 'span',
          'props': {
            'className': 'count',
            'children': value,
          },
        },
        {
          'type': 'div',
          'props': {
            'className': 'btn-group',
            'children': [
              {
                'type': 'button',
                'props': {
                  'className': null,
                  'children': [
                    {
                      'type': 'strong',
                      'props': {
                        'className': null,
                        'children': '-',
                      },
                    },
                  ],
                },
              },
              {
                'type': 'button',
                'props': {
                  'className': null,
                  'children': [
                    {
                      'type': 'strong',
                      'props': {
                        'className': null,
                        'children': 'RESET',
                      },
                    },
                  ],
                },
              },
              {
                'type': 'button',
                'props': {
                  'className': null,
                  'children': [
                    {
                      'type': 'strong',
                      'props': {
                        'className': null,
                        'children': '+',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
};

// 주어진 메서드 e 로 변환된 엘리먼트를 render 하는 메서드 작성
const element = (virtualDom, state) => {
  console.log(state, virtualDom);
  const { type, props } = virtualDom;

  // 컨테이너 노드 생성
  const container = document.createElement(type);

  console.log(props.className);
  // 클래스 추가 (현재 props는 class 1개로만 구성)
  props.className && container.classList.add(props.className);

  // 자식 요소 text | elementList 여부에 따라 appendChild. (재귀)
  Array.isArray(props.children)
    ? props.children.map(prop => container.appendChild(element(prop, state)))
    : container.appendChild(document.createTextNode(props.children));

  return container;
};

const ReactDOM = {
  render: (element, rootElement) => {
    console.log('render');
    rootElement.appendChild(element);
  },
  reRender: (element, rootElement) => {
    console.log('rerender');
    ReactDOM.render(element, rootElement);
  },
};

// 넣기
ReactDOM.render(element(virtualDom), document.querySelector('#root'));
