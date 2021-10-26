import deepObjectEqual from "../utils/deepEqual.js";
import { html } from "../utils/dom.js";

// 웹 컴포넌트 입니다.
class Component extends HTMLElement {
  constructor() {
    super();

    this.state = {};

    /* 프록시를 사용하려했는데 안되어서 남겨진 코드
    this.stateProxy = new Proxy(this.state, {
      get(target, prop) {
        console.log("proxy get");
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        console.log("proxy set"); // 왜 동작안하지?

        const newTemplate = this.getTemplate();
        this.diff(this.template, newTemplate);
      }
    });
  */
  }

  connectedCallback() {
    this.append(this.template);
  }

  // 아래부터는 제가 커스텀해준 메서드입니다.

  render() {
    const newTemplate = this.getTemplate();
    if (!this.template) {
      this.template = newTemplate;
    }

    this.diff(this.template, newTemplate);
  }

  getTemplate() {
    return html`<div></div>`;
  }

  diff($oldDom, $newDom) {
    const hasVirtualDom = !!$oldDom?.vDom;

    if (!hasVirtualDom) {
      $oldDom = Object.assign($oldDom, {
        vDom: $oldDom
      });
    }

    const isSameTagName = $oldDom.vDom?.localName === $newDom.localName;
    const isSameAttributes =
      deepObjectEqual(Array.from($oldDom.vDom.attributes || [])) ===
      deepObjectEqual(Array.from($newDom.attributes || []));

    const isSameData = $oldDom.vDom?.data === $newDom?.data;
    const isSameChildrenLength =
      $oldDom.vDom.childNodes.length === $newDom.childNodes.length;
    const isSameDom =
      isSameTagName && isSameAttributes && isSameData && isSameChildrenLength;

    if (!isSameDom) {
      $oldDom = Object.assign($oldDom, {
        vDom: $newDom
      });

      $oldDom.replaceWith($newDom);
      return;
    }

    for (let i = 0; i < $newDom.childNodes.length; i++) {
      if (!$oldDom.childNodes[i]) continue;
      if (!$newDom.childNodes[i]) continue;
      this.diff($oldDom.childNodes[i], $newDom.childNodes[i]);
    }
  }

  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] = value;
    });

    this.render();
  }
}

export default Component;
