import deepObjectEqual from "../deepEqual.js";
import { html } from "../dom.js";

// 웹 컴포넌트 입니다.
class Component extends HTMLElement {
  // 웹 컴포넌트에서 기본적으로 제공해주는 메서드입니다.
  constructor() {
    super();
  }

  // 엘리먼트가 생성될때 실행됩니다.
  connectedCallback() {
    this.render();
  }

  // 해당 요소가 새로운 문서로 이동될때 실행됩니다.
  adoptCallback() {}

  // observedAttributes에 등록된 요소의 속성이 추가, 제거, 업데이트, 교체되는 부분을 관찰하고 호출됩니다.
  attributeChangedCallback(attrName, oldValue, newValue) {}

  //attributeChangedCallback 에서 관찰하는 항목을 리턴합니다.
  static get observedAttributes() {}

  // custom element 가 제거될때 호출된다.
  disconnectedCallback() {}

  // 아래부터는 제가 커스텀해준 메서드입니다.
  // // step1에 필요한 기능들

  render() {}

  template = null;
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

  // // step2에 필요한 기능들
}

export default Component;
