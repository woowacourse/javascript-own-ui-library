import { stateController } from "./broc.js";
import { EMPTY_ELEMENT, FRAGMENT, TEXT_NODE } from "./constants/broc.js";

const setEventHandlers = (() => {
  const eventMap = new Map();

  return ($element, eventPropName, handler) => {
    const eventName = eventPropName.replace("on", "").toLowerCase();
    const eventMapKey = JSON.stringify({ $element, eventName });

    if (eventMap.has(eventMapKey)) {
      $element.removeEventListener(eventName, eventMap.get(eventMapKey));
    } else {
      eventMap.set(eventMapKey, handler);
    }

    $element.addEventListener(eventName, handler);
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
    ref: null,
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

  diff() {
    const newVDOM = createVDOMNode(this.element);

    const _diff = (newVDOMNode, storedVDOMNode) => {
      if (newVDOMNode.type !== storedVDOMNode.type) {
        this.updateAll();
      } else {
        if (newVDOMNode.type === FRAGMENT) {
          _diffChildren(newVDOMNode, storedVDOMNode);
        } else if (newVDOMNode.type === TEXT_NODE) {
          if (storedVDOMNode.props.value !== newVDOMNode.props.value) {
            this.updateAll();
          }
        } else {
          Object.keys(newVDOMNode.props)
            .filter((prop) => prop !== "children")
            .forEach((prop) => {
              if (storedVDOMNode.props[prop] !== newVDOMNode.props[prop]) {
                this.updateAll();
              }
            });

          Object.keys(storedVDOMNode.props).forEach((propKey) => {
            if (!(propKey in newVDOMNode.props)) {
              this.updateAll();
            }
          });

          _diffChildren(newVDOMNode, storedVDOMNode);
        }
      }
    };

    const _diffChildren = (newVDOMNode, storedVDOMNode) => {
      // length가 다르면 update
      if (newVDOMNode.props.children.length !== storedVDOMNode.props.children.length) {
        this.updateAll();
      } else {
        for (let i = 0; i < storedVDOMNode.props.children.length; i++) {
          _diff(newVDOMNode.props.children[i], storedVDOMNode.props.children[i]);
        }
      }
    };

    _diff(newVDOM, this.stored);
    this.stored = newVDOM;
  }

  renderVDOMtoDOM() {
    this.container.append(createDOMTreeFromVDOM(this.stored));
  }

  updateAll() {
    this.container.innerHTML = "";
    this.setVDOM();
    this.renderVDOMtoDOM();
  }

  updateDOM() {
    // this.diff();
    this.updateAll();
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
