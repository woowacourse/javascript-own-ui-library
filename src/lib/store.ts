import { Renderer } from "./@types/types";
import VStorage from "./storage/storage";

type VStorageStore = {
  [key: string]: VStorage;
};

type RendererStore = {
  [key: string]: Renderer;
};

class Store {
  private vStorageStore: VStorageStore = {};
  private rendererStore: RendererStore = {};
  private currentRootId: string | null = null;

  addRenderer(rootId: string, renderer: Renderer) {
    this.rendererStore[rootId] = renderer;
  }

  addVStorage(rootId: string, vStorage: VStorage) {
    this.vStorageStore[rootId] = vStorage;
  }

  getCurrentVStorage() {
    if (this.currentRootId === null) {
      throw Error("현재 rootId 가 설정되지 않았습니다!");
    }

    return this.vStorageStore[this.currentRootId];
  }

  getCurrentRenderer() {
    if (this.currentRootId === null) {
      throw Error("현재 rootId 가 설정되지 않았습니다!");
    }

    return this.rendererStore[this.currentRootId];
  }

  setCurrentRootId(rootId: string) {
    this.currentRootId = rootId;
  }
}

const store = new Store();

export default store;
