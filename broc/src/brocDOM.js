import { stateController } from "./broc.js";
import { EMPTY_ELEMENT, FRAGMENT, TEXT_NODE } from "./constants/broc.js";

const setEventHandlers = (() => {
  const eventMap = new Map();

  return ($element, eventPropName, handler) => {
    if (eventMap.get($element)?.has(eventPropName)) {
      return;
    }

    $element.addEventListener(eventPropName.replace("on", "").toLowerCase(), handler);

    if (!eventMap.has($element)) {
      eventMap.set($element, new Set());
    }

    eventMap.get($element).add(eventPropName);
  };
})();

const setDOMAttributesWithProps = ($element, props) => {
  Object.keys(props).forEach((propKey) => {
    switch (propKey) {
      case "htmlFor":
        $element.for = props.htmlFor;
        break;

      case "style":
        $element.style = Object.keys(props.style)
          .map(
            (styleKey) => `
          ${styleKey.replaceAll(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${props.style[styleKey]}
        `
          )
          .join(";");
        break;

      case "children":
        break;

      default:
        if (/^on/.test(propKey)) {
          setEventHandlers($element, propKey, props[propKey]);
        } else {
          $element[propKey] = props[propKey];
        }
    }
  });
};

const createFragmentFromVDOM = (vdomNode) => {
  if (vdomNode?.type !== FRAGMENT) {
    throw TypeError("Invalid parameter. 'vdomNode' is expected to be a VDOM FRAGMENT");
  }

  const fragment = document.createDocumentFragment();

  fragment.append(...vdomNode.props.children.map((child) => createDOMTreeFromVDOM(child)).filter((node) => node));

  return fragment;
};

const createTextNodeFromVDOM = (vdomNode) => {
  if (vdomNode?.type !== TEXT_NODE) {
    throw TypeError("Invalid parameter. 'vdomNode' is expected to be a VDOM TEXT NODE");
  }

  return document.createTextNode(vdomNode.props.value);
};

const createDOMNodeFromVDOM = (vdomNode) => {
  const $root = document.createElement(vdomNode.type);

  setDOMAttributesWithProps($root, vdomNode.props);
  $root.append(...vdomNode.props.children.map((child) => createDOMTreeFromVDOM(child)).filter((node) => node));

  return $root;
};

const createDOMTreeFromVDOM = (vdomNode) => {
  if (typeof vdomNode?.type !== "string") {
    throw TypeError("Invalid parameter. 'vdomNode' is expected to be a VDOM Node");
  }

  switch (vdomNode.type) {
    case FRAGMENT:
      return createFragmentFromVDOM(vdomNode);
    case TEXT_NODE:
      return createTextNodeFromVDOM(vdomNode);
    case EMPTY_ELEMENT:
      return null;
    default:
      return createDOMNodeFromVDOM(vdomNode);
  }
};

const createVDOMNode = (rootElement) => {
  if (typeof rootElement?.type !== "string" && typeof rootElement?.type !== "function") {
    throw TypeError("Invalid parameter. 'rootElement' is expected to be a return type of Broc.createElement");
  }

  if (typeof rootElement.type === "function") {
    return rootElement.type(rootElement.props);
  }

  return {
    ...rootElement,
    props: {
      ...rootElement.props,
      children: rootElement.children.map((child) =>
        typeof child.type === "function" ? child.type(child.props) : child
      ),
    },
  };
};

class VDOM {
  constructor(element, container) {
    if (typeof element?.type !== "string" && typeof element?.type !== "function") {
      throw TypeError("Invalid parameter. 'element' is expected to be a return type of Broc.createElement");
    }

    if (!(container instanceof HTMLElement)) {
      throw TypeError("Invalid parameter. 'container' is expected to be 'HTMLElement'");
    }

    if (!container.id) {
      throw Error("'container' must have own id");
    }

    this.element = element;
    this.container = container;
    this.stored = null;

    this.setVDOM();
  }

  setVDOM() {
    this.stored = createVDOMNode(this.element);
  }

  // diff() {
  //   const newVDOM = createVDOMNode(this.element);

  //   const _diff = (newVDOMNode, storedVDOMNode, parent) => {
  //     if (newVDOMNode.type !== storedVDOMNode.type) {
  //       if (storedVDOMNode.type === FRAGMENT) {
  //         removeChildrenAll(parent);
  //         parent.append(createDOMNodeFromVDOM(newVDOMNode));
  //       } else {
  //       }
  //     }
  //   };

  //   return _diff(newVDOM, this.stored, this.container);
  // }

  renderVDOMtoDOM() {
    this.container.append(createDOMTreeFromVDOM(this.stored));
  }

  updateDOM() {
    this.container.innerHTML = "";
    this.setVDOM();
    this.renderVDOMtoDOM();

    // this.element를 통해 새로운 vdom 생성
    // 새로운 vdom과 stored를 비교
    // 변화가 있는 dom의 좌표와 변경 사항을 저장
    // 변경사항을 dom에 반영
  }
}

const render = (() => {
  const VDOM_MAP = new Map();

  return (element, container) => {
    stateController.reset(container.id);

    const currentVDOM = VDOM_MAP.get(container.id) ?? new VDOM(element, container);

    stateController.registerRenderer(currentVDOM.updateDOM.bind(currentVDOM));

    if (!VDOM_MAP.has(container.id)) {
      currentVDOM.renderVDOMtoDOM();
      VDOM_MAP.set(container.id, currentVDOM);
    }
  };
})();

const BrocDOM = { render };

export default BrocDOM;
