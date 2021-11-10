import DOMStore from './DOMStore';

const CustomDOM = {
  render: (element, rootElement) => {
    const newVirtualDOM = CustomDOM.getVDOM(element);

    if (!CustomDOM.isDifferent(rootElement, newVirtualDOM)) {
      return;
    }

    rootElement.innerHTML = ``;
    CustomDOM.setVDOM(newVirtualDOM, rootElement);
  },
  getVDOM: element => {
    const { type, props } = element;

    // 1. Virtual DOM 만들기 (type, props, children 으로 구성)
    const virtualDOM = {
      type,
      props,
      children:
        Object(props.children) === props.children
          ? [props.children].flat().map(children => CustomDOM.getVDOM(children))
          : props.children,
    };

    return virtualDOM;
  },

  // 2. 기존 Virtual DOM 과 비교하기 *************
  isDifferent: (key, element) => {
    if (DOMStore[key] !== JSON.stringify(element)) {
      DOMStore[key] = JSON.stringify(element);
      return true;
    } else {
      return false;
    }
  },

  // 3. 다르면 rerender();
  setVDOM: (virtualDOM, rootElement) => {
    const { type, props, children } = virtualDOM;

    const VDOMElement = Object.entries(props).reduce(
      (totalNode, [key, value]) => {
        if (value && key !== 'children') {
          totalNode[key] = value;
        }

        if (value && key === 'onClick') {
          totalNode.addEventListener('click', props.onClick);
        }

        return totalNode;
      },
      type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(type)
    );

    Object(children) === children
      ? children.forEach(child => CustomDOM.setVDOM(child, VDOMElement))
      : VDOMElement.appendChild(document.createTextNode(children));

    rootElement.appendChild(VDOMElement);
  },
};

export default CustomDOM;
