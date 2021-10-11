import { VElement, EventHandler } from "../@types/types";
import store from "../store";

interface StateStorage {
  [key: number | string]: {
    [index: number]: any;
  };
}

interface handlerStorage {
  [selector: string]: EventHandler;
}

interface elementStorage {
  [key: number]: Element;
}

interface componentStorage {
  [key: number]: VElement;
}

export default class VStorage {
  private stateStorage: StateStorage = {};
  private handlerStorage: handlerStorage = {};
  private componentStorage: componentStorage = {};
  private elementStorage: elementStorage = {};
  private VDom: VElement | null = null;
  private elementIndex: number = 0;
  private stateIndex: number = 0;

  increaseStateIndex() {
    this.stateIndex += 1;
  }

  initStateIndex() {
    this.stateIndex = 0;
  }

  initState(elementIndex: number) {
    this.stateStorage[elementIndex] = {};
  }

  increaseElementIndex() {
    this.elementIndex += 1;
  }

  initElementIndex() {
    this.elementIndex = 0;
  }

  updater(latestVDom: VElement, onFindDifference: Function) {
    // const $element = this.elementStorage[this.elementIndex];
    // if (prevVDom.type !== latestVDom.type) {
    // }

    if (JSON.stringify(this.VDom) !== JSON.stringify(latestVDom)) {
      onFindDifference();
    }

    // 비교 끝난 후에 초기화
  }

  getElementStorage() {
    return this.elementStorage;
  }

  getComponentStorage() {}

  getStateStorage() {
    return this.stateStorage;
  }

  getElementState(elementIndex: number) {
    return this.stateStorage[elementIndex];
  }

  getState(elementIndex: number, stateIndex: number) {
    return this.stateStorage[elementIndex][stateIndex];
  }

  getCurrentStateIndex() {
    return this.stateIndex;
  }

  getCurrentElementIndex() {
    return this.elementIndex;
  }

  getVDom() {
    return this.VDom;
  }

  getCurrentElementState() {
    return this.stateStorage[this.elementIndex];
  }

  getHandlerStorage() {
    return this.handlerStorage;
  }

  setElement(elementIndex: number, $element: Element) {
    this.elementStorage[elementIndex] = $element;
  }

  addState(elementIndex: number, stateIndex: number, state: any) {
    this.stateStorage[elementIndex][stateIndex] = state;
  }

  addHandler(selector: string, eventHandler: EventHandler) {
    this.handlerStorage[selector] = eventHandler;
  }

  setVDom(rootElement: VElement) {
    this.VDom = rootElement;
  }

  setState(elementIndex: number, stateIndex: number, newState: any) {
    this.stateStorage[elementIndex][stateIndex] = newState;
  }

  updateState(state: any) {
    if (!(this.elementIndex in this.stateStorage)) {
      return;
    }

    this.stateStorage[this.elementIndex] = state;
  }

  updateHandler(selector: string, eventHandler: EventHandler) {
    if (!(this.elementIndex in this.handlerStorage)) {
      return;
    }

    this.handlerStorage[selector] = eventHandler;
  }
}
