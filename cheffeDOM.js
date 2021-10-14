import { ERROR_MESSAGE } from './constants.js';

class CheffeDOM {
  constructor() {
    this.eventList = [];
  }

  bindEvent(node, eventType, callback) {
    node.addEventListener(eventType, callback);

    this.eventList = [...this.eventList, { node, eventType, callback }];
  }

  createRealDOMNode({ nodeName, attributes, children }) {
    const node = document.createElement(nodeName);

    // element에 attr이 있다면 지정해준다
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        const isBindEvent = key.slice(0, 2) === 'on';

        if (isBindEvent && typeof value === 'function') {
          const eventType = key.slice(2);

          this.bindEvent(node, eventType, value);
        } else if (typeof value === 'string') {
          node.setAttribute(key, value);
        }
      });
    }

    // children에 다른 요소가 있다면 (Array일 경우) Real DOM Node로 만들어 현재 node에 append한다.
    if (Array.isArray(children)) {
      const childNodes = children.map((child) => this.createRealDOMNode(child));

      node.append(...childNodes);
    }

    // children이 배열이 아니라면 textNode로 만들어 현재 node에 appendChild한다.
    else {
      const textNode = document.createTextNode(children);

      node.appendChild(textNode);
    }

    // 구성된 Real DOM Node를 반환한다.
    return node;
  }

  render(Component, rootElement) {
    if (!rootElement) {
      throw new Error(ERROR_MESSAGE.RENDER.EMPTY_ROOT_ELEMENT);
    }

    const { nodeName, attributes, children } = Component();

    const fragment = document.createDocumentFragment();
    const node = this.createRealDOMNode({ nodeName, attributes, children });

    fragment.appendChild(node);
    rootElement.appendChild(fragment);
  }
}

export default CheffeDOM;
