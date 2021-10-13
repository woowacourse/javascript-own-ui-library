import {
  VElement,
  Handler,
  StateStorage,
  HandlerStorage,
  ElementStorage,
  DomEvent,
} from "../@types/types";
import { domEventList } from "../constants";
import { getGlobalEventHandler } from "../eventHandler";
import { setHTMLElementAttributes } from "../utils/utils";

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
  private elementStorage: ElementStorage = {};
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

  compare(prevVElement: VElement, vElement: VElement, index: number) {
    if (
      JSON.stringify(prevVElement.attribute) !==
      JSON.stringify(vElement.attribute)
    ) {
      const HTMLElement = this.elementStorage[index];
      // setHTMLElementAttributes(HTMLElement, vElement.attribute);
    }
  }

  updater(latestVDom: VElement, onFindDifference: Function) {
    // const $element = this.elementStorage[this.elementIndex];
    // if (prevVDom.type !== latestVDom.type) {
    // }

    if (JSON.stringify(this.VDom) !== JSON.stringify(latestVDom)) {
      onFindDifference();
    }
  }

  getElementStorage() {
    return this.elementStorage;
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
    this.elementStorage[elementIndex] = $element;
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
