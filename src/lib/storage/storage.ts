import {
  VElement,
  Handler,
  StateStorage,
  HandlerStorage,
  HTMLElementStorage,
  DomEvent,
} from "../@types/types";
import { domEventList } from "../constants";
import { getGlobalEventHandler } from "../eventHandler";
import { getHTMLElementStyles, setHTMLElementAttributes } from "../utils/utils";

const addAllDefaultEventListener = (
  handlerStorage: HandlerStorage,
  $root: Element
) => {
  domEventList.forEach((domEvent) => {
    handlerStorage[domEvent] = [];
    const globalClickEventHandler = getGlobalEventHandler(
      handlerStorage[domEvent]!
    );
    $root.addEventListener(domEvent, globalClickEventHandler);
  });
};

export default class VStorage {
  private stateStorage: StateStorage = {};
  private handlerStorage: HandlerStorage = {};
  private HTMLElementStorage: HTMLElementStorage = {};
  private VDom: VElement | null = null;
  private elementIndex: number = -1;
  private stateIndex: number = -1;
  private $root: Element;

  constructor(rootElement: Element) {
    this.$root = rootElement;
    addAllDefaultEventListener(this.handlerStorage, this.$root);
  }

  initState(elementIndex: number) {
    this.stateStorage[elementIndex] = [];
  }

  increaseElementIndex() {
    this.elementIndex += 1;
  }

  increaseStateIndex() {
    this.stateIndex += 1;
  }

  initElementIndex() {
    this.elementIndex = -1;
  }

  initStateIndex() {
    this.stateIndex = -1;
  }

  tryElementUpdate(prevVElement: VElement, vElement: VElement) {
    this.increaseElementIndex();
    const HTMLElement = this.HTMLElementStorage[this.elementIndex];

    if (prevVElement.type !== vElement.type) {
      return false;
    }

    if (typeof prevVElement.children !== typeof vElement.children) {
      return false;
    }

    if (
      Array.isArray(prevVElement.children) &&
      Array.isArray(vElement.children) &&
      prevVElement.children.length !== vElement.children.length
    ) {
      return false;
    }

    if (
      JSON.stringify(prevVElement.attribute) !==
      JSON.stringify(vElement.attribute)
    ) {
      setHTMLElementAttributes(HTMLElement, vElement.attribute);
    }

    if (JSON.stringify(prevVElement.style) !== JSON.stringify(vElement.style)) {
      HTMLElement.setAttribute("style", getHTMLElementStyles(vElement.style));
    }

    if (
      typeof prevVElement.children === "string" &&
      typeof vElement.children === "string" &&
      prevVElement.children !== vElement.children
    ) {
      HTMLElement.innerText = vElement.children;

      return true;
    }

    if (
      typeof prevVElement.children !== "string" &&
      typeof vElement.children !== "string"
    ) {
      prevVElement.children.forEach((child, index) => {
        return this.tryElementUpdate(
          child,
          vElement.children[index] as VElement
        );
      });
    }

    return true;
  }

  compare(latestVDom: VElement, onFindDifference: Function) {
    if (!this.VDom) {
      throw Error("업데이트 될 VDOM 이 초기화되지 않았습니다.");
    }

    const updateSuccess = this.tryElementUpdate(this.VDom, latestVDom);

    if (!updateSuccess) {
      onFindDifference();
    }
  }

  getHTMLElementStorage() {
    return this.HTMLElementStorage;
  }

  getStateStorage() {
    return this.stateStorage;
  }

  getState(stateIndex: number) {
    return this.stateStorage[stateIndex];
  }

  getElementIndex() {
    return this.elementIndex;
  }

  getStateIndex() {
    return this.stateIndex;
  }

  getVDom() {
    return this.VDom;
  }

  getHandlerStorage() {
    return this.handlerStorage;
  }

  getHandlers(event: DomEvent) {
    return this.handlerStorage[event];
  }

  setElement(elementIndex: number, $element: Element) {
    if (!($element instanceof HTMLElement)) {
      throw Error(
        "HTMLElement 가 아닌 Element를 HTMLElementStorage에 넣으려고 하고 있습니다"
      );
    }

    this.HTMLElementStorage[elementIndex] = $element;
  }

  setHandler(event: DomEvent, handler: Handler) {
    const eventHandlers = this.handlerStorage[event];
    const prevHandlerIndex = eventHandlers?.findIndex(
      (prevHandler) => prevHandler.template === handler.template
    );

    if (prevHandlerIndex !== -1) {
      eventHandlers?.splice(prevHandlerIndex!, 1, handler);
      return;
    }

    eventHandlers?.push(handler);
  }

  setVDom(rootElement: VElement) {
    this.VDom = rootElement;
  }

  setState(stateIndex: number, newState: any) {
    this.stateStorage[stateIndex] = newState;
  }
}
